import React, { useState, useEffect } from "react";
import { CircleX, Pencil } from "lucide-react";
import useSellerManageProduct from "../../stores/seller store/SellerManageProduct";
import useUserStore from "../../stores/userStore";
import ProductAdd from "../../components/seller/ProductAdd";
import Swal from "sweetalert2";
import EditModal from "../../components/seller/EditModal";
import moment from 'moment';


const ManageProduct = () => {
  const getStoreProduct = useSellerManageProduct(
    (state) => state.getStoreProduct
  );
  const deleteProduct = useSellerManageProduct((state) => state.deleteProduct);
  const user = useUserStore((state) => state.user)


  // console.log(user)

  const [mapItem, setMapItem] = useState([]);
  const [currentProduct, setCurrentProduct] = useState('')

  const id = user.store.id
  // const id = 1;


  useEffect(() => {
    MapStoreProduct();

  }, []);



  const MapStoreProduct = async () => {
    const getMapItem = await getStoreProduct(id);
    console.log(getMapItem);
    return setMapItem(getMapItem);
  };


  const handleDelete = async (id) => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ml-2",
        cancelButton: "btn btn-error mr-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product!?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteProduct(id);
          ;
          if (result) {
            MapStoreProduct()
          }
        } catch (error) {
          console.log(error)
        }
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "product has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "product is safe :)",
          icon: "error"
        });
      }
    });

  };

  const onSuccessAdd = () => {
    document.getElementById('product_modal').close();
    MapStoreProduct(); // รีโหลดข้อมูลหลังจากเพิ่มสินค้า
  }
  const onSuccessEdit = () => {
    document.getElementById('edit_product_modal').close();
    MapStoreProduct(); // รีโหลดข้อมูลหลังจากเพิ่มสินค้า
  }

  // const timeValid = moment(store?.timeOpen.slice(0, 19)).format('HH:mm:ss');
  
  return (
    <div>
      <div className="bg-white p-6 rounded-lg ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold ">Manage Product</h1>
          <button
            onClick={() => document.getElementById('product_modal').showModal()}
            className="bg-[#5abd4f] text-white px-8 py-2 mb-4 rounded-3xl"
          >
            เพิ่มสินค้า
          </button>
        </div>
        <hr />

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="border-b pl-20">ชื่อสินค้า</th>
              <th className="border-b p-2">ราคาปกติ</th>
              <th className="border-b p-2">ราคาพิเศษ</th>
              <th className="border-b p-2">วันหมดอายุ</th>
              <th className="border-b p-2">คงเหลือ</th>
              <th className="border-b p-2">มีส่วนผสมของ</th>
              <th className="border-b p-2">ประเภทอาหาร</th>
              <th className="border-b p-2"> แก้ไข</th>
              <th className="border-b p-2"> ลบ</th>
            </tr>
          </thead>

          <tbody>
            {mapItem?.data?.map((product) => {
              return (
                <tr key={product.id}>
                  <td className="border-b p-2 flex items-center ">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-36 h-28 rounded-lg mr-4"
                    />
                    {product.name}
                  </td>
                  <td className="border-b p-2 ">{product.originalPrice}</td>
                  <td className="border-b p-2  text-[#ff5722]">
                    {product.salePrice}
                  </td>
                  <td className="border-b p-2">{product.expirationDate ?  moment(product.expirationDate.slice(0, 19)).format('DD/MM/YYYY') : "-"}</td>
                  <td className="border-b p-2">{product.quantity}</td>

                  <td className="border-b p-2">{product?.productAllergens?.map((item) => <p>{item.allergen.name}</p>)}</td>

                  <td className="border-b p-2">{product?.productCategories?.map((categories) => <p>{categories.category.name}</p>)}</td>
                  <td className="border-b p-2 text-[#FFAE00] text-center cursor-pointer active:scale-95 duration-200 hover:drop-shadow-md hover:opacity-90 hover:scale-110 transition-all ">

                    <Pencil onClick={() => {

                      const modal = document.getElementById('edit_product_modal');
                      modal.showModal();
                      setCurrentProduct(product)
                      // console.log(currentProduct)
                    }} />

                  </td>
                  <td
                    onClick={() => handleDelete(product.id)}
                    className="border-b p-2 text-red-500 text-center cursor-pointer active:scale-95 duration-200 hover:drop-shadow-md hover:opacity-90 hover:scale-110 transition-all " 
                  >

                    <CircleX />

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <dialog id="product_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <ProductAdd onSuccessAdd={onSuccessAdd} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <dialog id="edit_product_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <EditModal
            onSuccessEdit={onSuccessEdit}
            product={currentProduct}

          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div >
  );
};

export default ManageProduct;
