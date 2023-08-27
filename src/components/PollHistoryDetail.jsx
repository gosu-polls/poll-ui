import "./css/Poll.css";

function PollHistoryDetail(props) {
  return (
    <>
      <div
        className="progress pollHistoryResults"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span className="pollHistoryResultText"> ENG </span>
        <div className="progress-bar w-75"></div>
        <span className="pollHistoryResultTextPercentage">75%</span>

        {/* <span className="pollHistoryResultProfileImg">KG</span>
            <span className="pollHistoryResultProfileImg">KK</span>
            <span className="pollHistoryResultProfileImg">AG</span> */}
      </div>
      <div className="pollHistoryResultProfile">
        <span className="pollHistoryResultProfileImg">KG</span>
        <span className="pollHistoryResultProfileImg">KK</span>
        <span className="pollHistoryResultProfileImg">AG</span>
      </div>
      <div
        className="progress pollHistoryResults"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span className="pollHistoryResultText"> NZL </span>
        <div className="progress-bar w-25"></div>
        <span className="pollHistoryResultTextPercentage">25%</span>

        {/* <span className="pollHistoryResultProfileImg">KG</span>
            <span className="pollHistoryResultProfileImg">KK</span>
            <span className="pollHistoryResultProfileImg">AG</span> */}
      </div>
      <div className="pollHistoryResultProfile">
        <span className="pollHistoryResultProfileImg">SM</span>
        <span className="pollHistoryResultProfileImg">SN</span>
      </div>

      <div
        className="progress pollHistoryResults"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span className="pollHistoryResultText"> NR / Tie </span>
        <div className="progress-bar w-0"></div>
        <span className="pollHistoryResultTextPercentage"> 0% </span>
      </div>

      <div className="pollHistoryResultProfile">
        <span className="pollHistoryResultProfileImg">AR</span>
        <span className="pollHistoryResultProfileImg">RP</span>
      </div>
    </>
  );
}

export { PollHistoryDetail };
