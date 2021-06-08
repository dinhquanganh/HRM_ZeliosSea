import React from "react";
import { setPopup } from "actions";
import { connect } from "react-redux";
class EventItem extends React.Component {
  render() {
    const { dataEvent } = this.props;
    // let timeChange = time.replace("-", "/").split("T")[0].replace("-", "/");
    console.log(dataEvent);
    return (
      <div className="event_item">
        <div className="event-time">{dataEvent[0].date}</div>
        <div className="event-detail">
          {dataEvent.map((value, index) => (
            <div
              className="detail_item"
              onClick={() => {
                setPopup({
                  isShow: true,
                  typePopup: "eventPopup",
                  dataPopup: dataEvent,
                });
              }}
            >
              <div className="detail-name">{value.name}</div>
              <div className="detail-data">Chi tiết</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default connect(null, { setPopup })(EventItem);
