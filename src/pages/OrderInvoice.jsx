import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  WindmillContext,
} from "@windmill/react-ui";
import { useContext, useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useParams } from "react-router";
import ReactToPrint from "react-to-print";

//internal import
import logoLight from "@/assets/img/logo/24pf-logo-removebg-preview-header.png";
import logoDark from "@/assets/img/logo/24pf-logo-removebg-preview-header.png";
import Invoice from "@/components/invoice/Invoice";
import InvoiceForDownload from "@/components/invoice/InvoiceForDownload";
import Loading from "@/components/preloader/Loading";
import Status from "@/components/table/Status";
import PageTitle from "@/components/Typography/PageTitle";
import useAsync from "@/hooks/useAsync";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import OrderServices from "@/services/OrderServices";

const OrderInvoice = () => {
  const { mode } = useContext(WindmillContext);
  const { id } = useParams();
  const printRef = useRef();

  const { data, loading, error } = useAsync(() =>
    OrderServices.getOrderById(id)
  );

  const {
    currency,
    globalSetting,
    showDateTimeFormat,
    showDateFormat,
    getNumberTwo,
  } = useUtilsFunction();

  return (
    <>
      <PageTitle> {"Thông tin hóa đơn"} </PageTitle>

      <div
        ref={printRef}
        className="bg-white dark:bg-gray-800 mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden"
      >
        {!loading && (
          <div className="">
            <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-700 dark:text-gray-300">
              <h1 className="font-bold font-serif text-xl uppercase">
                {"Thông tin hóa đơn"}
                <p className="text-xs mt-1 text-gray-500">
                  {"Trạng thái"}
                  <span className="pl-2 font-medium text-xs capitalize">
                    {" "}
                    <Status status={data.status} />
                  </span>
                </p>
              </h1>
              <div className="lg:text-right text-left">
                <h2 className="lg:flex lg:justify-end text-lg font-serif font-semibold mt-4 lg:mt-0 lg:ml-0 md:mt-0">
                  {mode === "dark" ? (
                    <img src={logoDark} alt="kachabazar" width="110" />
                  ) : (
                    <img src={logoLight} alt="kachabazar" width="110" />
                  )}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Địa chỉ: {globalSetting?.address} <br />
                  Liên hệ: Hoà Hiệp Bắc, Liên Chiểu, Đà Nẵng <br />
                  {/* Email: {globalSetting?.email} <br /> */}
                  {/* Website: {globalSetting?.website} */}
                </p>
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
              <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {"Thời gian"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  {showDateFormat(data?.createdAt)}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {"Hóa đơn số"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  #{data?.invoice}
                </span>
              </div>
              <div className="flex flex-col lg:text-right text-left">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {"Gửi đến"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  Khách hàng: {data?.user_info?.name} 
                  <br />
                  {/* Email: {data?.user_info?.email}{" "} */}
                  <span className="ml-2">
                    Liên hệ:{data?.user_info?.contact}
                  </span>
                  <br />
                  Địa chỉ: {data?.user_info?.address?.substring(0, 30)}
                  <br />
                  {/* Thành phố / thị trấn: {data?.user_info?.city},{" "}
                  {data?.user_info?.country}, <br />
                  ZipCode: {data?.user_info?.zipCode} */}
                </span>
              </div>
            </div>
          </div>
        )}
        <div>
          {loading ? (
            <Loading loading={loading} />
          ) : error ? (
            <span className="text-center mx-auto text-red-500">{error}</span>
          ) : (
            <TableContainer className="my-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>{"Sr"}</TableCell>
                    <TableCell>Sản phẩm</TableCell>
                    <TableCell className="text-center">{"Số lượng"}</TableCell>
                    <TableCell className="text-center">{"Giá"}</TableCell>
                    <TableCell className="text-right">{"Giảm giá"}</TableCell>
                  </tr>
                </TableHeader>
                <Invoice
                  data={data}
                  currency={currency}
                  getNumberTwo={getNumberTwo}
                />
              </Table>
            </TableContainer>
          )}
        </div>

        {!loading && (
          <div className="border rounded-xl border-gray-100 p-8 py-6 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex lg:flex-row md:flex-row flex-col justify-between">
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {"Thanh toán"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block">
                  {data.paymentStatus == true ? "Đã thanh toán" : "Chưa thanh toán"}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {"Chi phí vận chuyển"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.shippingCost)}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {"Giảm giá"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.discount)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {"Tổng số tiền hóa đơn"}
                </span>
                <span className="text-xl font-serif font-bold text-red-500 dark:text-emerald-500 block">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.total)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {!loading && (
        <div className="mb-4 mt-3 flex justify-between">
          <PDFDownloadLink
            document={
              <InvoiceForDownload
                data={data}
                globalSetting={globalSetting}
                currency={currency}
                getNumberTwo={getNumberTwo}
                showDateFormat={showDateFormat}
              />
            }
            fileName="Invoice"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Đang tải ..."
              ) : (
                <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600  w-auto cursor-pointer">
                  Tải hóa đơn
                  <span className="ml-2 text-base">
                    <IoCloudDownloadOutline />
                  </span>
                </button>
              )
            }
          </PDFDownloadLink>

          <ReactToPrint
            trigger={() => (
              <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600  w-auto">
                {"In hóa đơn"}
                <span className="ml-2">
                  <FiPrinter />
                </span>
              </button>
            )}
            content={() => printRef.current}
            documentTitle="Invoice"
          />
        </div>
      )}
    </>
  );
};

export default OrderInvoice;
