import * as line from "@line/bot-sdk";
import express from "express";
import fs from 'fs/promises';
import { type } from "os";


const db = {
  order: {
    name: null,
    price: null,
    image: null,
    type: null,
  },
  destination: {
    title: null,
    address: null,
  },
  dateTime: {
    date: null,
    time: null,
  },
};

const config = {
  channelSecret: "//",
};

const client = new line.messagingApi.MessagingApiClient({
  channelAccessToken: "//",
});

const app = express();
const port = 3000;
app.listen(port, () => console.log(`Starting application on port: ${port}`));

app.post("/callback", line.middleware(config), async (req, res) => {
  try {
    const results = await Promise.all(req.body.events.map(handleEvent));
    res.send(results);
  } catch (err) {
    console.error("Error handling events:", err);
    res.status(500).send();
  }
});
async function handleEvent(event) {
  await client.showLoadingAnimation({
    chatId: event.source.userId,
    loadingSeconds: 5,
  });

  switch (event.message.type) {
    case "text":
      handleTextMessage(event);
      break;
    // case "location":
    //   handleLocation(event);
      break;
    default:
      return null;
  }
}


// function handleLocation(event) {
//   console.log(event.message)

//   const message = {
//     type: "text",
//     text: `Select shipping date`,
//   };

//   return client.replyMessage({
//     replyToken: event.replyToken,
//     messages: [message],
//   });
// }



function handleTextMessage(event) {
  var CategoryOrder = ''
  var MenuOrder = ''
  console.log(event)
  if (event.message.text.startsWith("Select")) {
    CategoryOrder = event.message.text.split(" ")[1];
  }
  if (event.message.text.startsWith("Order")) {
    MenuOrder = event.message.text.split(" ")[1];
  }
  if (event.message.text === "START ORDER"){
    var test = sendMenu(event)
    return test
    }
  if (event.message.text === `Select ${CategoryOrder} Food`) return sendOrdering(event, CategoryOrder);
  if (event.message.text === `Order ${MenuOrder}`) return sendLocation(event, CategoryOrder);
  // if (event.message.text === `Select shipping date`) return sendDateTimePicker(event, CategoryOrder);



  return 
}

// function sendDateTimePicker(event) {
//   return client.replyMessage(event.replyToken, {
//     type: 'template',
//     altText: 'กรุณาเลือกวันที่และเวลา',
//     template: {
//       type: 'buttons',
//       text: 'กรุณาเลือกวันที่และเวลา',
//       actions: [
//         {
//           type: 'datetimepicker',
//           label: 'เลือกวันและเวลา',
//           data: 'action=select_datetime', // ข้อมูลที่จะส่งกลับไปเมื่อผู้ใช้เลือก
//           mode: 'datetime',
//           initial: '2025-02-02T12:00', // เวลาตั้งต้น
//           max: '2025-12-31T23:59', // เวลาสูงสุด
//           min: '2025-01-01T00:00', // เวลาต่ำสุด
//         },
//       ],
//     },
//   });
// }


function generateFlexMessage(event,menuData) {


  const flexMessage = {
    type: "flex",
    altText: "this is a flex message",
    contents: {
      type: "carousel",
      contents: menuData.map(category => ({
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "image",
              url: category.image,
              size: "full",
              aspectMode: "cover",
              aspectRatio: "2:3",
              gravity: "top",
            },
            ...category.menu.map(item => ({
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: category.name,
                  size: "xl",
                  color: "#ffffff",
                  weight: "bold",
                },
                // {
                //   type: "box",
                //   layout: "baseline",
                //   contents: [
                //     {
                //       type: "text",
                //       text: item.price,
                //       color: "#ebebeb",
                //       size: "sm",
                //     }
                //   ],
                //   spacing: "lg",
                // },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "button",
                      action: {
                        type: "message",
                        label: "Order",
                        text: `Select ${category.name} Food`,
                      },
                      margin: "lg",
                      style: "secondary",
                      color: "#FFFFFF",
                    },
                  ],
                },
              ],
              position: "absolute",
              offsetBottom: "0px",
              offsetStart: "0px",
              offsetEnd: "0px",
              backgroundColor: "#03303Acc",
              paddingAll: "20px",
              paddingTop: "18px",
            }))
          ],
          paddingAll: "0px",
        },
      }))
    }
  };

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [flexMessage],
  });
}

async function sendMenu(event) {
  try {
    const data = await fs.readFile('data/foodTypes.json', 'utf8');
    const menuData = JSON.parse(data);

    const flexMessage = generateFlexMessage(event ,menuData);

    console.log(JSON.stringify(flexMessage, null, 2));
  } catch (err) {
    console.error('Error reading the file:', err);
  }
}

async function sendOrdering(event,CategoryOrder) {
  try {
    const data = await fs.readFile('data/foodTypes.json', 'utf8');
    const menuData = JSON.parse(data);

    const flexMessage = generateFlexMessage2(event ,menuData, CategoryOrder);

    console.log(JSON.stringify(flexMessage, null, 2));
  } catch (err) {
    console.error('Error reading the file:', err);
  }
}

function generateFlexMessage2(event, menuData, CategoryOrder) {
  const selectedCategory = menuData.find(category => category.name.toLowerCase() === CategoryOrder.toLowerCase());

  console.log(menuData);

  if (!selectedCategory) {
    return client.replyMessage({
      replyToken: event.replyToken,
      messages: [{ type: 'text', text: `ไม่พบหมวดหมู่ ${CategoryOrder}` }]
    });
  }

  const flexMessage = {
    type: "flex",
    altText: "this is a flex message",
    contents: {
      type: "carousel",
      contents: selectedCategory.menu.map(item => ({
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "image",
              url: item.image,
              size: "full",
              aspectMode: "cover",
              aspectRatio: "2:3",
              gravity: "top",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  text: item.name,
                  size: "xl",
                  color: "#ffffff",
                  weight: "bold",
                },
                {
                  type: "box",
                  layout: "baseline",
                  contents: [
                    {
                      type: "text",
                      text: item.price,
                      color: "#ebebeb",
                      size: "sm",
                    }
                  ],
                  spacing: "lg",
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "button",
                      action: {
                        type: "message",
                        label: "Order",
                        text: `Order ${item.name}`,
                      },
                      margin: "lg",
                      style: "secondary",
                      color: "#FFFFFF",
                    },
                  ],
                },
              ],
              position: "absolute",
              offsetBottom: "0px",
              offsetStart: "0px",
              offsetEnd: "0px",
              backgroundColor: "#03303Acc",
              paddingAll: "20px",
              paddingTop: "18px",
            }
          ],
          paddingAll: "0px",
        },
      }))
    }
  };

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [flexMessage],
  });
}



function sendLocation(event) {
  const quickReply = {
    type: "text",
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "location",
            label: "Location",
          },
        },
      ],
    },
    text: "Select Destination",
  };

  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [quickReply],
  });
}