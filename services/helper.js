const foodTypeBubble = {
  type: "bubble",
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "image",
        url: "URL",
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
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "NAME",
                size: "xl",
                color: "#ffffff",
                weight: "bold",
              },
            ],
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
                  text: "SELECT XXXX TYPE",
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
        backgroundColor: "#ffa500cc",
        paddingAll: "20px",
        paddingTop: "18px",
      },
      {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "SALE",
            color: "#ffffff",
            align: "center",
            size: "xs",
            offsetTop: "3px",
          },
        ],
        position: "absolute",
        cornerRadius: "20px",
        offsetTop: "18px",
        backgroundColor: "#ff334b",
        offsetStart: "18px",
        height: "25px",
        width: "53px",
      },
    ],
    paddingAll: "0px",
  },
};

const foodBubble = {
  type: "bubble",
  hero: {
    type: "image",
    url: "URL",
    size: "full",
    aspectRatio: "20:13",
    aspectMode: "cover",
  },
  body: {
    type: "box",
    layout: "vertical",
    spacing: "md",
    contents: [
      {
        type: "text",
        text: "NAME",
        size: "xl",
        weight: "bold",
      },
      {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "box",
            layout: "baseline",
            contents: [
              {
                type: "text",
                text: "PRICE",
                weight: "bold",
                margin: "sm",
                flex: 0,
              },
            ],
          },
          {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "button",
                style: "primary",
                color: "#905c44",
                margin: "xxl",
                action: {
                  type: "message",
                  label: "Order",
                  text: "Order Food",
                },
              },
            ],
          },
        ],
      },
    ],
  },
};

const reciept = {
  type: "bubble",
  body: {
    type: "box",
    layout: "vertical",
    contents: [
      {
        type: "text",
        text: "RECEIPT",
        weight: "bold",
        color: "#1DB446",
        size: "sm",
      },
      {
        type: "text",
        text: "NAME",
        weight: "bold",
        size: "xxl",
        margin: "md",
      },
      {
        type: "text",
        text: "FOOD TYPE",
        size: "xs",
        color: "#aaaaaa",
        wrap: true,
      },
      {
        type: "separator",
        margin: "xxl",
      },
      {
        type: "box",
        layout: "vertical",
        margin: "xxl",
        spacing: "sm",
        contents: [
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "Shipping Time",
                size: "sm",
                color: "#555555",
                flex: 0,
              },
            ],
          },
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                size: "sm",
                color: "#555555",
                flex: 0,
                text: "DATE TIME",
              },
            ],
          },
          {
            type: "separator",
            margin: "xxl",
          },
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "Destination",
                size: "sm",
                color: "#555555",
                flex: 0,
              },
            ],
            margin: "xl",
          },
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "LOCATION TITLE",
                size: "sm",
                color: "#555555",
                flex: 0,
              },
            ],
          },
          {
            type: "box",
            layout: "horizontal",
            contents: [
              {
                type: "text",
                text: "ADDRESS",
                size: "sm",
                color: "#555555",
                flex: 0,
              },
            ],
          },
          {
            type: "separator",
            margin: "xxl",
          },
          {
            type: "box",
            layout: "horizontal",
            margin: "xxl",
            contents: [
              {
                type: "text",
                text: "Total Price",
                size: "sm",
                color: "#555555",
              },
              {
                type: "text",
                text: "PRICE",
                size: "sm",
                color: "#111111",
                align: "end",
              },
            ],
          },
        ],
      },
      {
        type: "separator",
        margin: "xxl",
      },
      {
        type: "box",
        layout: "horizontal",
        margin: "md",
        contents: [
          {
            type: "text",
            text: "Order on",
            size: "xs",
            color: "#aaaaaa",
            flex: 0,
          },
          {
            type: "text",
            text: "CURRENT DATE",
            color: "#aaaaaa",
            size: "xs",
            align: "end",
          },
        ],
      },
    ],
  },
  styles: {
    footer: {
      separator: true,
    },
  },
};

export function getDatePickerConfig() {
  // Helper function to format date as "YYYY-MM-DDt00:00"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}t00:00`;
  };

  // Get current date and add one day for tomorrow (minDate)
  const now = new Date();
  const minDate = formatDate(new Date(now.getTime() + 24 * 60 * 60 * 1000)); // Midnight of tomorrow

  // Get the date 2 days after today for maxDate
  const maxDate = formatDate(new Date(now.getTime() + 48 * 60 * 60 * 1000)); // 2 days after today

  return { minDate, maxDate };
}
