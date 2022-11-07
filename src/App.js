import "./styles.css";

const meetings = [
  {
    id: "meeting-1",
    title: "Daily Standup",
    startTime: 3,
    endTime: 4,
    color: "red",
    textColor: "white"
  },
  {
    id: "meeting-2",
    title: "Product Discussion",
    startTime: 5,
    endTime: 7,
    color: "yellow"
  },
  {
    id: "meeting-3",
    title: "Roadmap Discussion",
    startTime: 6,
    endTime: 8,
    color: "pink"
  },
  {
    id: "meeting-3",
    title: "Roadmap Discussion",
    startTime: 7,
    endTime: 10,
    color: "powderblue"
  },
  {
    id: "meeting-4",
    title: "Testing Meeting",
    startTime: 9,
    endTime: 11,
    color: "green",
    textColor: "white"
  },
  {
    id: "meeting-5",
    title: "All-Hands",
    startTime: 9,
    endTime: 11,
    color: "blue",
    textColor: "white"
  },
  {
    id: "meeting-5",
    title: "All-Hands",
    startTime: 13,
    endTime: 14,
    color: "orange"
  },
  {
    id: "meeting-5",
    title: "All-Hands",
    startTime: 13,
    endTime: 14,
    color: "gray",
    textColor: "white"
  },
  {
    id: "meeting-5",
    title: "All-Hands",
    startTime: 13,
    endTime: 14,
    color: "orange"
  }
];

const widthConst = 250;
const heightConst = 50;

export default function App() {
  const total = meetings.length;
  let newMeetings = [
    { startTime: -1, endTime: -1 },
    ...meetings,
    { startTime: 24, endTime: 24 }
  ];
  let [overlap, waiting] = [0, []];
  for (let i = 1; i <= total; i++) {
    newMeetings[i].width = widthConst;
    newMeetings[i].height =
      heightConst * (newMeetings[i].endTime - newMeetings[i].startTime);
    newMeetings[i].top = heightConst * newMeetings[i].startTime;
    newMeetings[i].left = 0;
    if (newMeetings[i].startTime < newMeetings[i - 1].endTime) {
      overlap++;
    } else {
      overlap = 0;
    }
    newMeetings[i].marginLeft = 8 * overlap;
    if (
      newMeetings[i].endTime === newMeetings[i + 1].endTime &&
      newMeetings[i].startTime === newMeetings[i + 1].startTime
    ) {
      waiting.push(newMeetings[i]);
    } else {
      let waitingLength = waiting.length + 1;
      if (waitingLength !== 1) {
        waiting.push(newMeetings[i]);
        let leftOffset = 8 * (overlap - waitingLength + 1);
        waiting.forEach((meet, index) => {
          meet.width =
            (widthConst - 8 * (overlap - waitingLength + 1)) / waitingLength;
          meet.left = leftOffset;
          leftOffset += meet.width;
          meet.marginLeft = 0;
        });
        waiting = [];
      }
    }
  }
  newMeetings.splice(0, 1);
  newMeetings.splice(-1, 1);
  console.log(meetings);

  const meetArray = [];
  for (let i = 0; i < 24; i++) {
    meetArray.push([]);
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: widthConst + "px",
          border: "1px solid black"
        }}
      >
        {meetArray.map((meet, i) => {
          return (
            <div
              key={i}
              style={{
                boxSizing: "border-box",
                height: heightConst + "px",
                width: widthConst + "px",
                border: "0.5px solid black"
              }}
            />
          );
        })}
        {newMeetings.map((meeting) => {
          return (
            <div
              key={meeting.id}
              style={{
                backgroundColor: meeting.color,
                color: meeting.textColor,
                height: meeting.height + "px",
                boxSizing: "border-box",
                padding: "0 8px",
                width: meeting.width - meeting.marginLeft + "px",
                marginLeft: meeting.marginLeft + "px",
                position: "absolute",
                top: meeting.top + "px",
                left: meeting.left + "px",
                textAlign: "left"
              }}
            >
              <p
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  width: "100%"
                }}
              >
                {meeting.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
