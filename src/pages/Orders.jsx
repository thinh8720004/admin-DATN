import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Pagination,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import exportFromJSON from "export-from-json";
import { useContext, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

//internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import OrderTable from "@/components/order/OrderTable";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import OrderServices from "@/services/OrderServices";
import { notifyError } from "@/utils/toast";

const Orders = () => {
  const {
    time,
    setTime,
    status,
    endDate,
    setStatus,
    setEndDate,
    startDate,
    currentPage,
    searchText,
    searchRef,
    method,
    setMethod,
    setStartDate,
    setSearchText,
    handleChangePage,
    handleSubmitForAll,
    resultsPerPage,
  } = useContext(SidebarContext);

  const [loadingExport, setLoadingExport] = useState(false);

  const { data, loading, error } = useAsync(() =>
    OrderServices.getAllOrders({
      day: time,
      method: method,
      status: status,
      page: currentPage,
      endDate: endDate,
      startDate: startDate,
      limit: resultsPerPage,
      customerName: searchText,
    })
  );

  console.log(data)

  const { currency, getNumber, getNumberTwo } = useUtilsFunction();
  const { dataTable, serviceData } = useFilter(data?.orders);

  const handleDownloadOrders = async () => {
    try {
      setLoadingExport(true);
      const res = await OrderServices.getAllOrders({
        page: 1,
        day: time,
        method: method,
        status: status,
        endDate: endDate,
        download: true,
        startDate: startDate,
        limit: data?.totalDoc,
        customerName: searchText,
      });

      const exportData = res?.orders?.map((order) => ({
        _id: order._id,
        invoice: order.invoice,
        subTotal: getNumberTwo(order.subTotal),
        shippingCost: getNumberTwo(order.shippingCost),
        discount: getNumberTwo(order?.discount),
        total: getNumberTwo(order.total),
        paymentMethod: order.paymentMethod,
        status: order.status,
        user_info: order?.user_info?.name,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      }));

      exportFromJSON({
        data: exportData,
        fileName: "orders",
        exportType: exportFromJSON.types.csv,
      });
      setLoadingExport(false);
    } catch (err) {
      setLoadingExport(false);
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  const handleResetField = () => {
    setTime("");
    setMethod("");
    setStatus("");
    setEndDate("");
    setStartDate("");
    setSearchText("");
    searchRef.current.value = "";
  };

  return (
    <>
      <PageTitle>{"Quản lí đặt hàng"}</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form onSubmit={handleSubmitForAll}>
            <div className="grid gap-4 lg:gap-4 xl:gap-6 md:gap-2 md:grid-cols-5 py-2">
              <div>
                <Input
                  ref={searchRef}
                  type="search"
                  name="search"
                  placeholder="Tìm kiếm bằng tên khách hàng ..."
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <div>
                <Select onChange={(e) => setStatus(e.target.value)}>
                  <option value="Status" defaultValue hidden>
                    {"Trạng thái"}
                  </option>
                  <option value="Delivered" >{"Delivered"}</option>
                  <option value="Pending">{"Pending"}</option>
                  <option value="Processing">{"Processing"}</option>
                  <option value="Cancel">{"Cancel"}</option>
                </Select>
              </div>

              <div>
                <Select onChange={(e) => setTime(e.target.value)}>
                  <option value="" defaultValue hidden>
                    {"Giới hạn đặt hàng"}
                  </option>
                  <option value="5">{"5 ngày đặt hàng gần nhất"}</option>
                  <option value="7">{"7 ngày đặt hàng gần nhất"}</option>
                  <option value="15">{"15 ngày đặt hàng gần nhất"}</option>
                  <option value="30">{"30 ngày đặt hàng gần nhất"}</option>
                </Select>
              </div>
              <div>
                <Select onChange={(e) => setMethod(e.target.value)}>
                  <option value="Method" defaultValue hidden>
                    {"Thanh toán"}
                  </option>
                  <option value="Cash">{"Đã thanh toán"}</option>
                  <option value="Card">{"Chưa thanh toán"}</option>
                </Select>
              </div>
              <div>
                {loadingExport ? (
                  <Button disabled className="h-12 w-full">
                    <img
                      src={spinnerLoadingImage}
                      alt="Đang tải ..."
                      width={20}
                      height={10}
                    />
                    <span className="font-serif ml-2 font-light">
                      Đang xử lí ...
                    </span>
                  </Button>
                ) : (
                  <button
                    onClick={handleDownloadOrders}
                    disabled={data?.orders?.length <= 0 || loadingExport}
                    type="button"
                    className={`${
                      (data?.orders?.length <= 0 || loadingExport) &&
                      "opacity-50 cursor-not-allowed bg-emerald-600"
                    } flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium px-6 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600`}
                  >
                    Tải xuống đơn đặt hàng
                    <span className="ml-2 text-base">
                      <IoCloudDownloadOutline />
                    </span>
                  </button>
                )}
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
              <div>
                <Label>Ngày bắt đầu</Label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div>
                <Label>Ngày kết thúc</Label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <Button type="submit" className="h-12 w-full bg-emerald-700">
                  Lọc
                </Button>
                <Button
                  layout="outline"
                  onClick={handleResetField}
                  type="reset"
                  className="px-4 py-3 text-sm"
                >
                  Đặt lại
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      {data?.methodTotals?.length > 0 && (
        <Card className="shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-4">
          <CardBody>
            <div className="flex gap-1">
              {data?.methodTotals?.map((el, i) => (
                <div key={i + 1}>
                  {el?.method && (
                    <>
                      <span className="font-medium"> {el.method}</span> :{" "}
                      <span className="font-semibold">
                        {currency}
                        {getNumber(el.total)}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : error ? (
        <span className="text-center text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{"Hóa đơn số"}</TableCell>
                <TableCell>{"Thời gian"}</TableCell>
                <TableCell>{"Tên khách hàng"}</TableCell>
                <TableCell>{"Thanh toán"}</TableCell>
                <TableCell>{"Tổng tiền"}</TableCell>
                <TableCell>{"Phương thức thanh toán"}</TableCell>
                <TableCell>{"Trạng thái"}</TableCell>
                <TableCell>{"Cập nhật trạng thái"}</TableCell>
                <TableCell className="text-center">{"Hành động"}</TableCell>
              </tr>
            </TableHeader>
            <OrderTable orders={serviceData} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Không tìm thấy đặt hàng nào!" />
      )}
    </>
  );
};

export default Orders;
