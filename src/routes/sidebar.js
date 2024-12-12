/** @format */

import {
  FiCompass,
  FiGrid,
  FiSlack,
  FiUsers
} from "react-icons/fi";

/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const sidebar = [
  {
    path: "/dashboard", // the url
    icon: FiGrid, // icon
    name: "Bảng điều khiển", // name that appear in Sidebar
  },

  {
    icon: FiSlack,
    name: "Danh mục",
    routes: [
      {
        path: "/products",
        name: "Sản phẩm",
      },
      {
        path: "/categories",
        name: "Thể loại",
      },
      {
        path: "/suppliers",
        name: "Nhà cung cấp",
      }

      
    ],
  },

  {
    path: "/customers",
    icon: FiUsers,
    name: "Khách hàng",
  },
  {
    path: "/orders",
    icon: FiCompass,
    name: "Đơn hàng",
  },
  {
    path: "/reviews",
    icon: FiCompass,
    name: "Bình luận",
  },

   
];

export default sidebar;
