import React from "react";
import Scrollbars from "react-custom-scrollbars-2";

//internal import

import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import useCustomerSubmit from "@/hooks/useCustomerSubmit";
import DrawerButton from "@/components/form/button/DrawerButton";

const CustomerDrawer = ({ id }) => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useCustomerSubmit(id);

  // console.log('##CustomerDrawer',)
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={"Cập nhật thông tin khách hàng"}
            // description={"Update your Customer necessary information from here"}
          />
        ) : (
          <Title
            title={"Cập nhật khách hàng"}
            // description={"Add your Customer necessary information from here"}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Tên khách hàng"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder={"Nhập tên khách hàng ..."}
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Email"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder={"Nhập email ..."}
                />
                <Error errorName={errors.email} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Số điện thoại"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder={"Nhập số điện thoại ..."}
                />
                <Error errorName={errors.phone} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Địa chỉ"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="Address"
                  name="address"
                  type="text"
                  placeholder={"Nhập địa chỉ ..."}
                />
                <Error errorName={errors.address} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Khách hàng" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CustomerDrawer;
