import Switch from "react-switch";

const SwitchToggleChildSup = ({ title, handleProcess, processOption }) => {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between">
        {/* Label */}
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          {title}
        </label>

        {/* Switch */}
        <Switch
          onChange={handleProcess}
          checked={processOption}
          className="react-switch"
          uncheckedIcon={
            <div className="flex items-center justify-start text-white text-xs pr-5 pt-1">
              Ẩn
            </div>
          }
          width={115}
          height={28}
          handleDiameter={26}
          offColor="#0e9f6e"
          onColor="#2F855A"
          checkedIcon={
            <div className="flex items-center justify-center text-white text-xs pl-2 pt-1">
              Hiện
            </div>
          }
        />
      </div>
    </div>
  );
};

export default SwitchToggleChildSup;
