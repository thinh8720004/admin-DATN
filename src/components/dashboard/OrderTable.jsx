import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

//internal import
import Status from "@/components/table/Status";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const OrderTable = ({ orders }) => {
  const { currency, showDateTimeFormat, getNumberTwo } = useUtilsFunction();
  return (
    <>
      <TableBody>
        {orders?.map((order) => (
          <TableRow key={order._id}>
            <TableCell>
              <span className="text-sm">
                {showDateTimeFormat(order.createdAt)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm ">{order?.user_info?.name}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
              {order.paymentStatus == true ? "Đã thanh toán" : "Chưa thanh toán"}
              </span>
            </TableCell>

            <TableCell>
              {" "}
              <span className="text-sm font-semibold">
                {currency}
                {getNumberTwo(order.total)}
              </span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm">{order?.user_info?.email}</span>{" "}
            </TableCell>
            <TableCell>
              <Status status={order.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
