import AttachmentProvider from "../components/AttachmentProvider";
import GameGrid from "../components/GameGrid";
import "../css/calculatorpage.css";

const CalculatorPage = () => {
  return (
    <AttachmentProvider>
      <GameGrid />
    </AttachmentProvider>
  );
};

export default CalculatorPage;
