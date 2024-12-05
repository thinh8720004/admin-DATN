/** @format */

import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

// internal imports
import SupplierTable from "@/components/supplier/SupplierTable";
import UploadManyTwo from "@/components/common/UploadManyTwo";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import SupplierDrawer from "@/components/drawer/SupplierDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import SwitchToggleChildSup from "@/components/form/switch/SwitchToggleChildSup";
import DeleteModal from "@/components/modal/DeleteModal";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import SupplierServices from "@/services/SupplierServices";

const Supplier = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);

  const { data, loading, error } = useAsync(SupplierServices.getAllSuppliers);
  const { data: allSuppliers } = useAsync(SupplierServices.getAllSuppliers);

  const { handleDeleteMany, allId, handleUpdateMany, serviceId } = useToggleDrawer();

  const {
    handleSubmitSupplier,
    supplierRef,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleChangePage,
    filename,
    isDisabled,
    setSupplierType,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data[0]?.children ? data[0]?.children : data);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [showChild, setShowChild] = useState(false);

  // Select or deselect all suppliers
  const handleSelectAll = () => {
    setIsCheckAll(prevState => {
      const newState = !prevState;
      if (newState) {
        setIsCheck(data[0]?.children.map(li => li._id));
      } else {
        setIsCheck([]);
      }
      return newState;
    });
  };

  // Reset supplier type filter
  const handleResetField = () => {
    setSupplierType("");
  };

  return (
    <>
      <PageTitle>{"Quản lí nhà cung cấp"}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} />

      <BulkActionDrawer
        ids={allId}
        title="Nhà cung cấp"
        lang={lang}
        data={data}
        isCheck={isCheck}
      />

      <MainDrawer>
        <SupplierDrawer id={serviceId} data={data} lang={lang} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form onSubmit={handleSubmitSupplier} className="py-3 grid gap-4 lg:gap-6 xl:gap-6 xl:flex">
            <div className="flex justify-start w-1/2 xl:w-1/2 md:w-full">
              <UploadManyTwo
                title="Suppliers"
                exportData={allSuppliers}
                filename={filename}
                isDisabled={isDisabled}
                handleSelectFile={handleSelectFile}
                handleUploadMultiple={handleUploadMultiple}
                handleRemoveSelectFile={handleRemoveSelectFile}
              />
            </div>

            <div className="lg:flex md:flex xl:justify-end xl:w-1/2 md:w-full md:justify-start flex-grow-0">
              <div className="w-full md:w-48 lg:w-48 xl:w-48 mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleUpdateMany(isCheck)}
                  className="w-full rounded-md h-12 text-gray-600 btn-gray"
                >
                  <span className="mr-2">
                    <FiEdit />
                  </span>
                  {"Hành động hàng loạt"}
                </Button>
              </div>

              <div className="w-full md:w-48 lg:w-48 xl:w-48  mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck.length < 1}
                  onClick={() => handleDeleteMany(isCheck)}
                  className="w-full rounded-md h-12 bg-red-500 disabled  btn-red"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>

                  {"Xóa nhà cung cấp"}
                </Button>
              </div>

              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button onClick={toggleDrawer} className="rounded-md h-12 w-full">
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {"Thêm nhà cung cấp"}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form onSubmit={handleSubmitSupplier} className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input ref={supplierRef} type="search" placeholder={"Tìm kiếm nhà cung cấp ..."} />
            </div>
            <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <div className="w-full mx-1">
                <Button type="submit" className="h-12 w-full bg-emerald-700">
                  Lọc
                </Button>
              </div>

              <div className="w-full mx-1">
                <Button
                  layout="outline"
                  onClick={handleResetField}
                  type="reset"
                  className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                >
                  <span className="text-black dark:text-gray-200">Đặt lại</span>
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <SwitchToggleChildSup
        title=" "
        handleProcess={setShowChild}
        processOption={showChild}
        name={showChild}
      />

      {loading ? (
        <TableLoading row={12} col={6} width={190} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                </TableCell>

                <TableCell>{"Logo"}</TableCell>
                <TableCell>{"Tên nhà cung cấp"}</TableCell>
                <TableCell>{"Email"}</TableCell>
                <TableCell>{"Số điện thoại"}</TableCell>
                <TableCell>{"Địa chỉ"}</TableCell>
                <TableCell className="text-center">{"Trạng thái"}</TableCell>
                <TableCell className="text-right">{"Hành động"}</TableCell>
              </tr>
            </TableHeader>

            <SupplierTable
              data={data}
              lang={lang}
              isCheck={isCheck}
              suppliers={dataTable}
              setIsCheck={setIsCheck}
              showChild={showChild}
            />
          </Table>

          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no suppliers right now." />
      )}
    </>
  );
};

export default Supplier;
