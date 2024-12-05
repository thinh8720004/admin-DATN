import Switch from "react-switch";

const SwitchToggleForCombination = ({
  title,
  product,
  handleProcess,
  processOption,
}) => {
  return (
    <>
      <div
        className={`${
          product ? "mb-3 flex flex-wrap justify-end items-center mr-8" : "mb-3"
        }`}
        style={{
          height: product ? 20 : 0,
          transition: "all 0.3s",
          visibility: product ? "visible" : "hidden",
          opacity: product ? "1" : "0",
        }}
      >
      
      </div>
    </>
  );
};

export default SwitchToggleForCombination;
