import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

const Invoice = ({ data, currency, getNumberTwo }) => {
  return (
    <>
      <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm ">
        {data?.cart?.map((item, i) => (
          <TableRow key={i} className="dark:border-gray-700 dark:text-gray-400">
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
              {i + 1}{" "}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">
              <span
                className={`text-gray-700 font-semibold  dark:text-gray-300 text-xs ${
                  item.length > 15 ? "wrap-long-title" : "" // Apply class conditionally
                }`}
              >
                {item.id.title}
              </span>
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
              {item.quantity}{" "}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.originalPrice)}
            </TableCell>

            <TableCell className="px-6 py-1 whitespace-nowrap text-right font-bold text-red-500 dark:text-emerald-500">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.discount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default Invoice;
