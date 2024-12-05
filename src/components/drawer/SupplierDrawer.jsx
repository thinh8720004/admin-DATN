import { Input } from "@windmill/react-ui";
import Scrollbars from "react-custom-scrollbars-2";

// Internal imports
import DrawerButton from "@/components/form/button/DrawerButton";
import InputArea from "@/components/form/input/InputArea";
import TextAreaCom from "@/components/form/input/TextAreaCom";
import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import Uploader from "@/components/image-uploader/Uploader";
import useSupplierSubmit from "@/hooks/useSupplierSubmit";
import SupplierServices from "@/services/SupplierServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const SupplierDrawer = ({ id, data }) => {
  const {
    register,
    onSubmit,
    handleSubmit,
    errors,
    imageUrl,
    setImageUrl,
    published,
    setPublished,
    isSubmitting,
  } = useSupplierSubmit(id, data);

  // Function to handle submitting supplier data (add or update)
  const handleSupplierSubmit = async (data) => {
    try {
      // If there's an ID, update the supplier; otherwise, add a new one
      if (id) {

        console.log(data);

        await SupplierServices.updateSupplier(id, data);
        notifySuccess("Supplier Updated Successfully!");
      } else {
        await SupplierServices.addSupplier(data);
        notifySuccess("Supplier Added Successfully!");
      }
    } catch (err) {
      notifyError(err.message);
    }
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            title={"Cập nhật thông tin nhà cung cấp"}
            // description={"Update Supplier Details"}
          />
        ) : (
          <Title
            register={register}
            title={"Thêm nhà cung cấp"}
            // description={"Add a new supplier"}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            {/* Supplier Name */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Tên nhà cung cấp"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Supplier Name"
                  name="name"
                  type="text"
                  placeholder={"Nhập tên nhà cung cấp ..."}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Email liên hệ"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder={"Nhập email liên hệ ..."}
                />
                <Error errorName={errors.email} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Số điện thoại"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Phone Number"
                  name="phone"
                  type="text"
                  placeholder={"Nhập số điện thoại ..."}
                />
                <Error errorName={errors.phone} />
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Địa chỉ"} />
              <div className="col-span-8 sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Address"
                  name="address"
                  placeholder="Nhập địa chỉ ..."
                />
                <Error errorName={errors.address} />
              </div>
            </div>

            {/* Supplier Logo */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Logo"} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="supplier"
                />
              </div>
            </div>

            {/* Published Toggle */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Hoạt động"} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  handleProcess={setPublished}
                  processOption={published}
                />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Nhà cung cấp" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default SupplierDrawer;
