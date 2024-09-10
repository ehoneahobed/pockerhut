const generateWelcomeEmail = (firstName, lastName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Porkerhut | Welcome Email</title>
        <!-- ICONS -->
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <!-- FONTS -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <style>
          * {
            margin: 0;
            box-sizing: border-box;
          }
          a {
            text-decoration: none;
            color: black;
          }
          h1,
          h2,
          h3,
          p,
          ul {
            margin: 0;
            padding: 0;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          p {
            line-height: 150%;
          }
        </style>
      </head>
      <body style="font-family: 'Inter', Arial, sans-serif; background: #fff">
        <!-- HEADER -->
        <table style="background: #c5decb; width: 100%; border-collapse: collapse">
          <tr>
            <td style="padding: 10px; vertical-align: top">
              <a href="https://porkerhut.com/">
                <img
                  src="https://i.ibb.co/7NXTjds/porkerhut.png"
                  alt="porkerhut logo"
                  width="150px"
                  height="auto"
                />
              </a>
            </td>
            <td style="vertical-align: middle; padding: 10px; text-align: end; border: none;">
              <a href="https://web.facebook.com/profile.php?id=100087600040948" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img
                  src="https://i.ibb.co/HYb9mGJ/entypo-social-facebook.png"
                  style="width: 20px; height: 20px"
                  alt="entypo-social-facebook"
                />
              </a>
              <a href="https://www.instagram.com/porkerhutnaija/" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img
                  src="https://i.ibb.co/MRWHTc5/ri-instagram-fill.png"
                  style="width: 20px; height: 20px"
                  alt="ri-instagram-fill"
                />
              </a>
              <a href="https://www.linkedin.com/in/porker-hut-24b1222b8/" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img
                  src="https://i.ibb.co/R0QDHXZ/akar-icons-linkedin-v1-fill.png"
                  style="width: 20px; height: 20px"
                  alt="akar-icons-linkedin-v1-fill"
                />
              </a>
              <a href="https://x.com/PorkerN87229" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img
                  src="https://i.ibb.co/bJPkLbp/mdi-twitter.png"
                  style="width: 20px; height: 20px"
                  alt="mdi-twitter"
                />
              </a>
            </td>
          </tr>
        </table>
        <!-- MAIN CONTENT -->
        <table style="width: 100%; background-color: white; margin: 0px auto 0; border: 1px solid #3333333f; padding: 20px;">
          <tr>
            <td>
              <h1 style="text-align: center; font-size: 20px; margin-bottom: 4px; display: block; width: 100%;">
                Welcome to Porker Hut, ${firstName} ${lastName}!
              </h1>
            </td>
          </tr>
          <tr>
            <td style="line-height: 20px">
              <p>
                You’ve successfully activated your customer account - thank you very much for being part of the family. Next time you shop with us, log in for faster checkout.
              </p>
            </td>
          </tr>
          <tr>
            <td style="text-align: center">
              <a
                href="https://porkerhut.com"
                style="
                  background: #197b30;
                  border-radius: 5px;
                  color: white;
                  text-transform: uppercase;
                  padding: 12px 16px;
                  display: block;
                  white-space: nowrap;
                  border: none;
                  width: 70%;
                  margin: 10px auto;
                  text-align: center;
                "
              >
                Visit our store
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 16px; line-height: 20px">
              If you have any questions, just reply to this email or contact us at
              <a href="mailto:info@porkerhut.com" style="color: #197b30; text-decoration: none">
                support@porkerhut.com
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 16px; line-height: 20px">
              <span>Thank you,</span><br /><span style="padding-top: 5px">Porkerhut</span>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
const generateOrderConfirmationEmail = (
  customerName,
  orderNumber,
  products,
  totalAmount,
  shippingAddress
) => {
  const productRows = products
    .map(
      (product) => `
      <tr>
        <td style="position: relative; padding: 10px 0">
          <img
            src="${product.image}"
            alt="${product.name}"
            style="width: 80px; height: 80px; float: left"
          />
          <div>
            <p style="font-size: 14px; padding-left: 85px; margin-top: 10px;">
              ${product.name}<br />
              <strong>PRODUCT ID:</strong> ${product.productId}
            </p>
          </div>
        </td>
        <td>${product.quantity}</td>
        <td>${product.price}</td>
      </tr>
        <tr>
          <td colspan="3" style="padding-bottom: 10px">
          <h3 style="font-size: 14px; margin-bottom: 4px">Order Notes:</h3>
          <p style="font-size: 14px">
            ${
              product.orderNotes
                ? product.orderNotes
                : "Williams, please know this is the order note of the customer. At Porker Hut, we’re absolutely elated to have you as a part of our exclusive community, where fine meat enthusiasts unite."
            }
          </p>
         </td>
         </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Porkerhut | Order Confirmation</title>
        <!-- ICONS -->
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <!-- FONTS -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <style>
          * {
            margin: 0;
            box-sizing: border-box;
          }
          a {
            text-decoration: none;
            color: black;
          }
          h1, h2, h3, p, ul {
            margin: 0;
            padding: 0;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          p {
            line-height: 150%;
          }
        </style>
      </head>
      <body style="font-family: 'Inter', Arial, sans-serif; background: #fff">
        <!-- HEADER -->
        <table style="background: #c5decb; width: 100%; border-collapse: collapse">
          <tr>
            <td style="padding: 10px; vertical-align: top">
              <a href="https://porkerhut.com/">
                <img
                  src="https://i.ibb.co/7NXTjds/porkerhut.png"
                  alt="porkerhut logo"
                  width="150px"
                  height="auto"
                />
              </a>
            </td>
            <td style="vertical-align: middle; padding: 10px; text-align: end;">
              <a href="https://web.facebook.com/profile.php?id=100087600040948" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/HYb9mGJ/entypo-social-facebook.png" style="width: 20px; height: 20px" alt="entypo-social-facebook"/>
              </a>
              <a href="https://www.instagram.com/porkerhutnaija/" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/MRWHTc5/ri-instagram-fill.png" style="width: 20px; height: 20px" alt="ri-instagram-fill"/>
              </a>
              <a href="https://www.linkedin.com/in/porker-hut-24b1222b8/" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/R0QDHXZ/akar-icons-linkedin-v1-fill.png" style="width: 20px; height: 20px" alt="akar-icons-linkedin-v1-fill"/>
              </a>
              <a href="https://x.com/PorkerN87229" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/bJPkLbp/mdi-twitter.png" style="width: 20px; height: 20px" alt="mdi-twitter"/>
              </a>
            </td>
          </tr>
        </table>
        <!-- MAIN CONTENT -->
        <table style="width: 100%; background-color: white; margin: 0px auto 0; border: 1px solid #3333333f; padding: 20px;">
          <thead>
            <tr>
              <td>
                <h3 style="text-align: center">Order Confirmation</h3>
                <p style="text-align: center; line-height: 150%; margin: 10px 0">
                  Your order <strong>#${orderNumber}</strong> has been successfully confirmed.
                </p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p style="line-height: 150%; margin-bottom: 15px">
                  It will be packaged and shipped as soon as possible. Once this
                  happens, you will receive a shipping notification email with
                  tracking information. We will call you within 4 hours (calling
                  hours: Mon-Fri 8am - 8pm; Sat 9am - 5pm) to follow up on your
                  order.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <table style="width: 100%; border-collapse: collapse">
                  <tr>
                    <th style="text-align: left; border-top: 2px solid #c5decb; border-bottom: 2px solid #c5decb; padding: 10px 0;">
                      ITEMS SHIPPED
                    </th>
                    <td style="text-align: left; border-top: 2px solid #c5decb; border-bottom: 2px solid #c5decb; padding: 10px 0;">
                      QTY
                    </td>
                    <td style="text-align: left; border-top: 2px solid #c5decb; border-bottom: 2px solid #c5decb; padding: 10px 0;">
                      PRICE
                    </td>
                  </tr>
                  ${productRows}
                  <tr>
                    <td style="border-top: 2px solid #c5decb; padding: 10px 0">
                      <ul style="list-style: none; padding: 0">
                      <li style="text-transform: uppercase; font-size: 14px; font-weight: 500; padding-bottom: 8px;">Shipping Cost</li>
                        <li style="text-transform: uppercase; font-size: 14px; font-weight: 500; padding-bottom: 8px;">Total</li>
                      </ul>
                    </td>
                    <td colspan="2" style="border-top: 2px solid #c5decb; padding: 10px 0">
                      <ul style="list-style: none; padding: 0">
                      <li style="font-size: 14px; padding-bottom: 8px; text-align: right;">${totalAmount}</li>
                      <li style="font-size: 14px; padding-bottom: 8px; text-align: right;">${totalAmount}</li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="border: 2px solid #c5decb; padding: 20px; font-size: 14px">
                SHIPPING ADDRESS:<br />
                ${customerName}<br />
                ${shippingAddress.address}<br />
                ${shippingAddress.city}, ${shippingAddress.state}<br />
                <br />
                ${shippingAddress.phoneNumber}
              </td>
            </tr>
            <tr>
              <td colspan="3" style="padding: 30px 0">
                <button
                  style="border: none; padding: 12px 24px; background: #197b30; font-size: 12px; text-transform: uppercase; color: white; width: 50%; border-radius: 5px; margin: 0 auto; display: block; cursor: pointer;">
                  <a href="https://porkerhut.com/"
                    style="text-decoration: none; color: white; display: block">Track
                    Order</a>
                </button>
              </td>
            </tr>
                    <tr>
          <td colspan="3">
            <table
              style="
                background-color: #c5decb;
                width: 100%;
                padding: 30px 20px;
                border-radius: 20px;
                margin-top: 20px;
              "
            >
              <tbody>
                <tr>
                  <th style="font-size: 24px; color: #333333">Need help?</th>
                </tr>
                <tr>
                  <td
                    style="
                      text-align: center;
                      font-size: 16px;
                      padding-top: 10px;
                      color: #333333;
                    "
                  >
                    For any further infos, please click on the link below to
                    contact our amazing client support.
                    <br />
                    <a
                      href="https://porkerhut.com/contact-us"
                      style="
                        width: 60%;
                        margin: 20px auto 0;
                        display: block;
                        padding: 12px 24px;
                        background: #197b30;
                        color: white;
                        border-radius: 5px;
                      "
                    >
                      Contact us
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
        </table>
      </body>
    </html>
  `;
};
const generateOrderCancellationEmail = (orderNumber, products) => {
  const productRows = products
    .map(
      (product) => `
      <tr>
        <td style="position: relative; padding: 10px 0">
          <img
            src="${product.image}"
            alt="${product.name}"
            style="width: 80px; height: 80px; float: left"
          />
          <div>
            <p style="font-size: 14px; padding-left: 85px; margin-top: 10px;">
              ${product.name}<br />
              <strong>PRODUCT ID:</strong> ${product.productId}
            </p>
          </div>
        </td>
        <td>${product.quantity}</td>
      </tr>
      <tr>
          <td colspan="3" style="padding-bottom: 10px">
          <h3 style="font-size: 14px; margin-bottom: 4px">Order Notes:</h3>
          <p style="font-size: 14px">
            ${
              product.orderNotes
                ? product.orderNotes
                : "Williams, please know this is the order note of the customer. At Porker Hut, we’re absolutely elated to have you as a part of our exclusive community, where fine meat enthusiasts unite."
            }
          </p>
         </td>
     </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Porkerhut | Order Cancellation</title>
        <!-- ICONS -->
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <!-- FONTS -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <style>
          * {
            margin: 0;
            box-sizing: border-box;
          }
          a {
            text-decoration: none;
            color: black;
          }
          h1, h2, h3, p, ul {
            margin: 0;
            padding: 0;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          p {
            line-height: 150%;
          }
        </style>
      </head>
      <body style="font-family: 'Inter', Arial, sans-serif; background: #fff">
        <!-- HEADER -->
        <table style="background: #c5decb; width: 100%; border-collapse: collapse">
          <tr>
            <td style="padding: 10px; vertical-align: top">
              <a href="https://porkerhut.com/">
                <img
                  src="https://i.ibb.co/7NXTjds/porkerhut.png"
                  alt="porkerhut logo"
                  width="150px"
                  height="auto"
                />
              </a>
            </td>
            <td style="vertical-align: middle; padding: 10px; text-align: end;">
              <a href="https://web.facebook.com/profile.php?id=100087600040948" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/HYb9mGJ/entypo-social-facebook.png" style="width: 20px; height: 20px" alt="entypo-social-facebook"/>
              </a>
              <a href="https://www.instagram.com/porkerhutnaija/" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/MRWHTc5/ri-instagram-fill.png" style="width: 20px; height: 20px" alt="ri-instagram-fill"/>
              </a>
              <a href="https://www.linkedin.com/in/porker-hut-24b1222b8/" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/R0QDHXZ/akar-icons-linkedin-v1-fill.png" style="width: 20px; height: 20px" alt="akar-icons-linkedin-v1-fill"/>
              </a>
              <a href="https://x.com/PorkerN87229" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/bJPkLbp/mdi-twitter.png" style="width: 20px; height: 20px" alt="mdi-twitter"/>
              </a>
            </td>
          </tr>
        </table>
        <!-- MAIN CONTENT -->
        <table style="width: 100%; background-color: white; margin: 0px auto 0; border: 1px solid #3333333f; padding: 20px;">
          <thead>
            <tr>
              <td>
                <h3 style="text-align: center">Your Order Has Been Cancelled</h3>
                <p style="text-align: center; line-height: 150%; margin: 10px 0">
                  Unfortunately, your order <strong>#${orderNumber}</strong> has been cancelled.
                </p>
              </td>
            </tr>
          </thead>
          <tbody>
          <tr>
          <td>
            <p style="line-height: 150%; font-size: 14px; margin-bottom: 15px">
              We will proceed to call you within 48 hours (calling hours:
              Mon-Fri 8am - 8pm; Sat 9am - 5pm) to process your refund. Please
              be aware if your refund is above 100,000 Naira, additional details
              such as a valid proof of ID, first 6 and last 4 digits on your
              bank card, may be required. These details are required by our
              banking partners and regulators and we kindly request your
              support. <br /><br />
              Please do note Porker Hut will never ask you for your password,
              PIN, CVV or full card details over the phone or via email.
            </p>
            </td>
            </tr>
            <tr>
              <td>
                <table style="width: 100%; border-collapse: collapse">
                  <tr>
                    <th style="text-align: left; border-top: 2px solid #c5decb; border-bottom: 2px solid #c5decb; padding: 10px 0;">
                      ITEMS SHIPPED
                    </th>
                    <td style="text-align: left; border-top: 2px solid #c5decb; border-bottom: 2px solid #c5decb; padding: 10px 0;">
                      QTY
                    </td>
                  </tr>
                  ${productRows}
              <tr>
                <td
                  colspan="3"
                  style="
                    border-top: 2px solid #c5decb;
                    padding: 10px 0;
                    font-size: 14px !important;
                  "
                >
                  <span
                    style="
                      margin-bottom: 10px;
                      display: inline-block;
                      font-size: 14px;
                    "
                  >
                    Thank you for shopping with us!</span
                  ><br />
                  <span
                    style="
                      margin-bottom: 10px;
                      display: inline-block;
                      font-size: 14px;
                    "
                  >
                    Best Regards</span
                  ><br />
                  <span
                    style="
                      margin-bottom: 10px;
                      display: inline-block;
                      font-size: 14px;
                    "
                  >
                    Porker Hut</span
                  >
                </td>
              </tr>
                </table>
              </td>
            </tr>
                    <tr>
          <td colspan="3">
            <table
              style="
                background-color: #c5decb;
                width: 100%;
                padding: 30px 20px;
                border-radius: 20px;
                margin-top: 20px;
              "
            >
              <tbody>
                <tr>
                  <th style="font-size: 24px; color: #333333">Need help?</th>
                </tr>
                <tr>
                  <td
                    style="
                      text-align: center;
                      font-size: 16px;
                      padding-top: 10px;
                      color: #333333;
                    "
                  >
                    For any further infos, please click on the link below to
                    contact our amazing client support.
                    <br />
                    <a
                      href="https://porkerhut.com/contact-us"
                      style="
                        width: 60%;
                        margin: 20px auto 0;
                        display: block;
                        padding: 12px 24px;
                        background: #197b30;
                        color: white;
                        border-radius: 5px;
                      "
                    >
                      Contact us
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
        </table>
      </body>
    </html>
  `;
};
const generateOrderDeliveredEmail = (orderNumber, products, customerName) => {
  const productRows = products
    .map(
      (product) => `
      <tr>
        <td style="position: relative; padding: 10px 0">
          <img
            src="${product.image}"
            alt="${product.name}"
            style="width: 80px; height: 80px; float: left"
          />
          <div>
            <p style="font-size: 14px; padding-left: 85px; margin-top: 10px;">
              ${product.name}<br />
              <strong>PRODUCT ID:</strong> ${product.productId}
            </p>
          </div>
        </td>
        <td>${product.quantity}</td>
      </tr>
      <tr>
          <td colspan="3" style="padding-bottom: 10px">
          <h3 style="font-size: 14px; margin-bottom: 4px">Order Notes:</h3>
          <p style="font-size: 14px">
            ${
              product.orderNotes
                ? product.orderNotes
                : "Williams, please know this is the order note of the customer. At Porker Hut, we’re absolutely elated to have you as a part of our exclusive community, where fine meat enthusiasts unite."
            }
          </p>
         </td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Porkerhut | Order Delivered</title>
        <!-- ICONS -->
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <!-- FONTS -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <style>
          * {
            margin: 0;
            box-sizing: border-box;
          }
          a {
            text-decoration: none;
            color: black;
          }
          h1, h2, h3, p, ul {
            margin: 0;
            padding: 0;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          p {
            line-height: 150%;
          }
        </style>
      </head>
      <body style="font-family: 'Inter', Arial, sans-serif; background: #fff">
        <!-- HEADER -->
        <table style="background: #c5decb; width: 100%; border-collapse: collapse">
          <tr>
            <td style="padding: 10px; vertical-align: top">
              <a href="https://porkerhut.com/">
                <img
                  src="https://i.ibb.co/7NXTjds/porkerhut.png"
                  alt="porkerhut logo"
                  width="150px"
                  height="auto"
                />
              </a>
            </td>
            <td style="vertical-align: middle; padding: 10px; text-align: end;">
              <a href="https://web.facebook.com/profile.php?id=100087600040948" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/HYb9mGJ/entypo-social-facebook.png" style="width: 20px; height: 20px" alt="entypo-social-facebook"/>
              </a>
              <a href="https://www.instagram.com/porkerhutnaija/" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/MRWHTc5/ri-instagram-fill.png" style="width: 20px; height: 20px" alt="ri-instagram-fill"/>
              </a>
              <a href="https://www.linkedin.com/in/porker-hut-24b1222b8/" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/R0QDHXZ/akar-icons-linkedin-v1-fill.png" style="width: 20px; height: 20px" alt="akar-icons-linkedin-v1-fill"/>
              </a>
              <a href="https://x.com/PorkerN87229" style="padding-left: 5px; display: inline-block; color: #333333dd">
                <img src="https://i.ibb.co/bJPkLbp/mdi-twitter.png" style="width: 20px; height: 20px" alt="mdi-twitter"/>
              </a>
            </td>
          </tr>
        </table>
        <!-- MAIN CONTENT -->
        <table style="width: 100%; background-color: white; margin: 0px auto 0; border: 1px solid #3333333f; padding: 20px;">
          <thead>
            <tr>
              <td>
                <h3 style="text-align: center">Your Order <strong>#${orderNumber}</strong> was received today </h3>
                <h4 style="text-align: center; font-size: 14px; margin: 10px 0">Thank you for shopping with us.</h4>
              </td>
            </tr>
          </thead>
          <tbody>
          <tr>
          <td>
            <p style="line-height: 150%; margin-bottom: 15px">
              This is a formal acknowledgment that today
              <strong>(${new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })})</strong> your representative
              <strong>(${customerName})</strong> collected the following packages:
            </p>
            </td>
            </tr>
            <tr>
              <td>
                <table style="width: 100%; border-collapse: collapse">
                  <tr>
                    <th style="text-align: left; border-top: 2px solid #c5decb; border-bottom: 2px solid #c5decb; padding: 10px 0;">
                      ITEMS SHIPPED
                    </th>
                    <td style="text-align: left; border-top: 2px solid #c5decb; border-bottom: 2px solid #c5decb; padding: 10px 0;">
                      QTY
                    </td>
                  </tr>
                  ${productRows}
              <tr>
                <td
                  colspan="3"
                  style="border-top: 2px solid #c5decb; padding: 10px 0"
                >
                  <p style="font-size: 14px">
                    Please note that if we haven’t received any feedbacks within
                    24 hour we will consider the order correctly received by
                    you.
                  </p>
                </td>
              </tr>
              <tr>
                <td
                  colspan="3"
                  style="
                    border-top: 2px solid #c5decb;
                    padding: 10px 0;
                    font-size: 14px !important;
                  "
                >
                  <span
                    style="
                      margin-bottom: 10px;
                      display: inline-block;
                      font-size: 14px;
                    "
                  >
                    Thank you for shopping with us!</span
                  ><br />
                  <span
                    style="
                      margin-bottom: 10px;
                      display: inline-block;
                      font-size: 14px;
                    "
                  >
                    Best Regards</span
                  ><br />
                  <span
                    style="
                      margin-bottom: 10px;
                      display: inline-block;
                      font-size: 14px;
                    "
                  >
                    Porker Hut</span
                  >
                </td>
              </tr>
                </table>
              </td>
            </tr>
          <tr>
          <td colspan="3">
            <table
              style="
                background-color: #c5decb;
                width: 100%;
                padding: 30px 20px;
                border-radius: 20px;
                margin-top: 20px;
              "
            >
              <tbody>
                <tr>
                  <th style="font-size: 24px; color: #333333">Need help?</th>
                </tr>
                <tr>
                  <td
                    style="
                      text-align: center;
                      font-size: 16px;
                      padding-top: 10px;
                      color: #333333;
                    "
                  >
                    For any further infos, please click on the link below to
                    contact our amazing client support.
                    <br />
                    <a
                      href="https://porkerhut.com/contact-us"
                      style="
                        width: 60%;
                        margin: 20px auto 0;
                        display: block;
                        padding: 12px 24px;
                        background: #197b30;
                        color: white;
                        border-radius: 5px;
                      "
                    >
                      Contact us
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        </tbody>
        </table>
      </body>
    </html>
  `;
};
const generateNewWelcomeEmail = (customerName, products) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Porkerhut | Welcome Email</title>
      <!-- ICONS -->
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <!-- FONTS -->
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <style>
        * {
          margin: 0;
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
          color: black;
          display: inline-block;
        }
        h1,
        h2,
        h3,
        p,
        ul {
          margin: 0;
          padding: 0;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        p {
          line-height: 150%;
        }
      </style>
    </head>
    <body style="font-family: 'Inter', Arial, sans-serif; background: #fff">
      <!-- HEADER -->
      <table style="background: #c5decb; width: 100%; border-collapse: collapse">
        <tr>
          <td style="padding: 10px; vertical-align: top">
            <a href="https://porkerhut.com/"
              ><img
                src="https://i.ibb.co/7NXTjds/porkerhut.png"
                alt="porkerhut logo"
                width="150px"
                height="auto"
            /></a>
          </td>
          <td
            style="
              vertical-align: middle;
              padding: 10px;
              text-align: end;
              border: none;
            "
          >
            <a
              href="https://web.facebook.com/profile.php?id=100087600040948"
              style="padding-left: 5px; display: inline-block; color: #333333dd"
            >
              <img
                src="https://i.ibb.co/HYb9mGJ/entypo-social-facebook.png"
                style="width: 20px; height: 20px"
                alt="entypo-social-facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/porkerhutnaija/"
              style="padding-left: 5px; display: inline-block; color: #333333dd"
            >
              <img
                src="https://i.ibb.co/MRWHTc5/ri-instagram-fill.png"
                style="width: 20px; height: 20px"
                alt="ri-instagram-fill"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/porker-hut-24b1222b8/"
              style="padding-left: 5px; display: inline-block; color: #333333dd"
            >
              <img
                src="https://i.ibb.co/R0QDHXZ/akar-icons-linkedin-v1-fill.png"
                style="width: 20px; height: 20px"
                alt="akar-icons-linkedin-v1-fill"
              />
            </a>
            <a
              href="https://x.com/PorkerN87229"
              style="padding-left: 5px; display: inline-block; color: #333333dd"
            >
              <img
                src="https://i.ibb.co/bJPkLbp/mdi-twitter.png"
                style="width: 20px; height: 20px"
                alt="mdi-twitter"
              />
            </a>
          </td>
        </tr>
      </table>
      <!-- MAIN CONTENT -->
      <table
        style="
          width: 100%;
          height: 200px;
          overflow: hidden;
          border-radius: 0;
          background-image: url(https://i.ibb.co/Z8ZYLMN/bg.png);
          background-size: cover;
          background-position: center;
        "
      ></table>
      <table
        style="
          width: 100%;
          background-color: white;
          margin: 0px auto 0;
          border-bottom: 1px solid #3333333f;
          padding: 20px;
        "
      >
        <!-- Welcome Text -->
        <tr style="padding-top: 0px">
          <td style="padding: 0px; text-align: left">
            <h2
              style="
                color: #333333;
                font-size: 18px;
                text-align: center;
                margin-bottom: 20px;
              "
            >
              Thanks for signing up, ${customerName}!
            </h2>
            <p
              style="
                color: #666666;
                font-size: 14px;
                line-height: 150%;
                margin-bottom: 20px;
              "
            >
              Greetings, we hope this message finds you in the best of spirits.
              At Porker Hut, we’re absolutely elated to have you as a part of
              our exclusive community, where fine meat enthusiasts unite.
            </p>
            <p
              style="
                color: #666666;
                font-size: 14px;
                line-height: 150%;
                margin-bottom: 20px;
              "
            >
              We're not just about offering premium meat; we're a tight-knit
              family of culinary connoisseurs who deeply respect the artistry
              behind every cut of our exceptional meats. From the farm to your
              table, we infuse every step of the process with unwavering care
              and dedication to ensure that your dining experiences are nothing
              short of extraordinary.
            </p>
            <p
              style="
                color: #666666;
                font-size: 14px;
                line-height: 150%;
                margin-bottom: 20px;
              "
            >
              In the upcoming weeks, prepare to receive privileged access to our
              finest cuts, livestocks, farm feeds and enticing special offers.
              If you have specific preferences or ways we can elevate your
              Porker Hut journey, don’t hesitate to share. Your adventure with
              us is as significant as the remarkable service we provide.
            </p>
            <p
              style="
                color: #666666;
                font-size: 14px;
                line-height: 150%;
                margin-bottom: 20px;
              "
            >
              We extend our heartfelt gratitude for choosing Porker Hut and
              giving us the privilege to share our culinary passion with you.
              Together, we are embarking on a delectable gastronomic journey
              that promises to be nothing short of remarkable.
            </p>
          </td>
        </tr>
        <tr>
          <td style="border-top: 1px solid #c0c0c0"></td>
        </tr>
        <!-- Best Sellers Section -->
        <tr>
          <td align="center" style="padding: 10px">
            <h2 style="color: #333333; font-size: 16px; text-align: center">
              SHOP OUR BEST SELLERS
            </h2>
          </td>
        </tr>
        <!-- Products -->
        <tr>
          <td align="center">
            <table width="100%" cellpadding="10" cellspacing="0">
              ${products
                .map(
                  (product) => `
                <tr>
                  <td align="center" style="width: 33%">
                    <img
                      src="${product.image}"
                      alt="${product.productName}"
                      style="width: 180px; height: 180px"
                    />
                    <p style="color: #333; font-size: 12px; margin: 10px 0">
                      ${product.productName}
                    </p>
                    <a
                      href="https://porkerhut.com/product/${product.productId}"
                      style="
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #197b30;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 5px;
                        font-size: 12px;
                      "
                      >SHOP NOW</a
                    >
                  </td>
                </tr>`
                )
                .join("")}
            </table>
          </td>
        </tr>
      </table>
      <table>
        <!-- Satisfaction Guarantee -->
        <tr>
          <td style="padding: 2px; text-align: center">
            <p
              style="
                color: #666666;
                font-size: 12px;
                border: 2px solid #197b3084;
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                margin-top: 20px;
              "
            >
              <strong>Porker Hut Satisfaction Guarantee:</strong> We believe in
              our products and will back them 100%. That is why we offer a
              return policy, if for any reason you are not happy with the
              quality of our products simply return them for a full refund.
            </p>
          </td>
        </tr>
        <!-- Unsubscribe -->
        <tr>
          <td align="center" style="padding: 20px">
            <p style="color: #666666; font-size: 12px">
              No longer want to receive these emails?
              <a
                href="#"
                style="
                  color: #197b30;
                  font-weight: 500;
                  text-decoration: underline;
                  display: inline-block;
                  padding-block: 8px;
                "
                >Unsubscribe</a
              ><br />
            </p>
            <p style="color: #666666; font-size: 12px; padding: 0 15px">
              Plot No. 41198 Cadastral Zone D24, Kapa, Kugwaru, Nasarawa State,
              Nigeria
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

const resetEmail = (resetLink) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Porkerhut | Password Reset</title>
      <!-- ICONS -->
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <!-- FONTS -->
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <style>
        * {
          margin: 0;
          box-sizing: border-box;
        }
        a {
          text-decoration: none;
          color: black;
        }
        h1,
        h2,
        h3,
        p,
        ul {
          margin: 0;
          padding: 0;
        }
        img {
          max-width: 100%;
          height: auto;
        }
        p {
          line-height: 150%;
        }
      </style>
    </head>
    <body style="font-family: 'Inter', Arial, sans-serif; background: #fff">
      <!-- HEADER -->
      <table style="background: #c5decb; width: 100%; border-collapse: collapse">
        <tr>
          <td style="padding: 10px; vertical-align: top">
            <a href="https://porkerhut.com/">
              <img
                src="https://i.ibb.co/7NXTjds/porkerhut.png"
                alt="porkerhut logo"
                width="150px"
                height="auto"
              />
            </a>
          </td>
          <td style="vertical-align: middle; padding: 10px; text-align: end; border: none;">
            <a
              href="https://web.facebook.com/profile.php?id=100087600040948"
              style="padding-left: 5px; display: inline-block; color: #333333dd"
            >
              <img
                src="https://i.ibb.co/HYb9mGJ/entypo-social-facebook.png"
                style="width: 20px; height: 20px"
                alt="entypo-social-facebook"
              />
            </a>
            <a
              href="https://www.instagram.com/porkerhutnaija/"
              style="padding-left: 5px; display: inline-block; color: #333333dd"
            >
              <img
                src="https://i.ibb.co/MRWHTc5/ri-instagram-fill.png"
                style="width: 20px; height: 20px"
                alt="ri-instagram-fill"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/porker-hut-24b1222b8/"
              style="padding-left: 5px; display: inline-block; color: #333333dd"
            >
              <img
                src="https://i.ibb.co/R0QDHXZ/akar-icons-linkedin-v1-fill.png"
                style="width: 20px; height: 20px"
                alt="akar-icons-linkedin-v1-fill"
              />
            </a>
            <a
              href="https://x.com/PorkerN87229"
              style="padding-left: 5px; display: inline-block; color: #333333dd"
            >
              <img
                src="https://i.ibb.co/bJPkLbp/mdi-twitter.png"
                style="width: 20px; height: 20px"
                alt="mdi-twitter"
              />
            </a>
          </td>
        </tr>
      </table>
      <!-- MAIN CONTENT -->
      <table style="width: 100%; background-color: white; margin: 0px auto 0; border: 1px solid #3333333f; padding: 20px;">
        <tr>
          <td>
            <h1 style="text-align: center; font-size: 20px; margin-bottom: 4px; display: block; width: 100%;">
              Reset Your Password.
            </h1>
            <p style="text-align: center; font-size: 16px; font-weight: 500; margin: 10px 0;">
              Things Happen!
            </p>
          </td>
        </tr>
        <tr>
          <td style="line-height: 1.5">
            Follow this link to reset your customer account password at Porker Hut. If you didn’t request a new password, you can safely ignore and delete this email.
          </td>
        </tr>
        <tr>
          <td>
            <a
              href="${resetLink}"
              style="
                background: #197b30;
                border-radius: 5px;
                color: white;
                text-transform: uppercase;
                padding: 12px 16px;
                display: block;
                white-space: nowrap;
                border: none;
                margin: 30px 0;
                width: 70%;
                margin: 0 auto;
                text-align: center;
              "
            >
              Reset my password
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <table style="background-color: #c5decb; width: 100%; padding: 30px 20px; border-radius: 20px; margin-top: 20px;">
              <tbody>
                <tr>
                  <th style="font-size: 24px; color: #333333">Need help?</th>
                </tr>
                <tr>
                  <td style="text-align: center; font-size: 16px; padding-top: 10px; color: #333333;">
                    For any further infos, please click on the link below to contact our amazing client support.
                    <br />
                    <a
                      style="
                        width: 60%;
                        margin: 20px auto 0;
                        display: block;
                        padding: 12px 24px;
                        background: #197b30;
                        color: white;
                        border-radius: 5px;
                      "
                      href="https://porkerhut.com/contact"
                    >
                      Contact us
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;
};

const deactivateEmail = (fullName, deactivationDate) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Porkerhut | Account Deactivation</title>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <style>
          * { margin: 0; box-sizing: border-box; font-size: 14px; }
          a { text-decoration: none; color: black; }
          h1, h2, h3, p, ul { margin: 0; padding: 0; }
          img { max-width: 100%; height: auto; }
          p { line-height: 150%; }
        </style>
      </head>
      <body style="font-family: 'Inter', Arial, sans-serif; background: #f8f9fa; padding: 2%; color: #333;">
        <table style="border-collapse: collapse; margin: 0 auto; max-width: 600px; background: #fff;">
          <tr>
            <td>
              <table style="background: #c5decb; width: 100%; border-collapse: collapse">
                <tr>
                  <td style="padding: 10px; vertical-align: top">
                    <a href="https://porkerhut.com/">
                      <img src="https://i.ibb.co/7NXTjds/porkerhut.png" alt="porkerhut logo" width="150px" height="auto"/>
                    </a>
                  </td>
                  <td style="vertical-align: middle; padding: 10px; text-align: end; border: none;">
                    <a href="https://web.facebook.com/profile.php?id=100087600040948" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/HYb9mGJ/entypo-social-facebook.png" style="width: 20px; height: 20px" alt="entypo-social-facebook"/>
                    </a>
                    <a href="https://www.instagram.com/porkerhutnaija/" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/MRWHTc5/ri-instagram-fill.png" style="width: 20px; height: 20px" alt="ri-instagram-fill"/>
                    </a>
                    <a href="https://www.linkedin.com/in/porker-hut-24b1222b8/" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/R0QDHXZ/akar-icons-linkedin-v1-fill.png" style="width: 20px; height: 20px" alt="akar-icons-linkedin-v1-fill"/>
                    </a>
                    <a href="https://x.com/PorkerN87229" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/bJPkLbp/mdi-twitter.png" style="width: 20px; height: 20px" alt="mdi-twitter"/>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table style="width: 100%; background-color: white; margin: 0px auto 0; border: 0px solid #3333333f; padding: 2%;">
                <tr>
                  <td>
                    <p>Hi <span style="font-weight: 500">${fullName}</span>,</p>
                    <p style="padding: 10px 0">
                      We regret to inform you that your PorkerHut account has been
                      <span style="color: #e10; font-weight: 500"> deactivated</span>.
                    </p>
                    <p>
                      If this action was taken in error or if you have any questions, please contact our support team immediately at
                      <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="mailto:info@porkerhut.com">info@porkerhut.com</a>
                      or call us at
                      <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="tel:+2348057808076">+2348057808076</a>.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3 style="font-weight: 500; font-size: 1rem; margin-bottom: 5px; margin-top: 20px;">
                      For your reference:
                    </h3>
                    <ul style="padding-left: 0px; list-style: none">
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        - Reason for Deactivation: (Brief reason, e.g., "Inactivity" or "Policy Violation")
                      </li>
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        - Date of Deactivation: ${deactivationDate}
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="padding: 10px 0">
                      If you wish to reactivate your account or need further assistance, we are here to help. Please let us know how we can assist you.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="padding: 10px 0">
                      Thank you for being a part of PorkerHut!
                    </p>
                    <p style="padding: 10px 0">Best regards,</p>
                    <p>The PorkerHut Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

const activateEmail = (fullName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Porkerhut | Welcome Email</title>
        <!-- ICONS -->
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />

        <!-- FONTS -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />

        <style>
          * {
            margin: 0;
            box-sizing: border-box;
            font-size: 14px;
          }
          a {
            text-decoration: none;
            color: black;
          }
          h1, h2, h3, p, ul {
            margin: 0;
            padding: 0;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          p {
            line-height: 150%;
          }
        </style>
      </head>

      <body style="font-family: 'Inter', Arial, sans-serif; background: #f8f9fa; padding: 2%; color: #333;">
        <table style="border-collapse: collapse; margin: 0 auto; max-width: 600px; background: #fff;">
          <tr>
            <td>
              <!-- HEADER -->
              <table style="background: #c5decb; width: 100%; border-collapse: collapse">
                <tr>
                  <td style="padding: 10px; vertical-align: top">
                    <a href="https://porkerhut.com/">
                      <img src="https://i.ibb.co/7NXTjds/porkerhut.png" alt="porkerhut logo" width="150px" height="auto" />
                    </a>
                  </td>
                  <td style="vertical-align: middle; padding: 10px; text-align: end; border: none;">
                    <a href="https://web.facebook.com/profile.php?id=100087600040948" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/HYb9mGJ/entypo-social-facebook.png" style="width: 20px; height: 20px" alt="entypo-social-facebook" />
                    </a>
                    <a href="https://www.instagram.com/porkerhutnaija/" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/MRWHTc5/ri-instagram-fill.png" style="width: 20px; height: 20px" alt="ri-instagram-fill" />
                    </a>
                    <a href="https://www.linkedin.com/in/porker-hut-24b1222b8/" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/R0QDHXZ/akar-icons-linkedin-v1-fill.png" style="width: 20px; height: 20px" alt="akar-icons-linkedin-v1-fill" />
                    </a>
                    <a href="https://x.com/PorkerN87229" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/bJPkLbp/mdi-twitter.png" style="width: 20px; height: 20px" alt="mdi-twitter" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <!-- MAIN CONTENT -->
              <table style="width: 100%; background-color: white; margin: 0px auto 0; border: 0px solid #3333333f; padding: 2%;">
                <tr>
                  <td>
                    <p>Hi <span style="font-weight: 500">${fullName}</span>,</p>
                    <p style="padding: 10px 0">
                      We’re excited to let you know that your PorkerHut account has been successfully
                      <span style="color: #197b30; font-weight: 500">activated</span>!
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3 style="font-weight: 500; font-size: 1rem; margin-bottom: 5px">
                      You can now log in and start exploring our platform. Here are a few things you can do:
                    </h3>
                    <ol style="padding-left: 20px">
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        <span style="font-weight: 500">Log In: </span>
                        Access your account
                        <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="https://porkerhut.com/login?q=customer">here</a>
                        to start managing your listings and orders.
                      </li>
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        <span style="font-weight: 500">Explore: </span>
                        Browse our products and services to get familiar with what’s available.
                      </li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="padding: 10px 0">
                      If you have any questions or need assistance, don’t hesitate to reach out to our support team at
                      <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="mailto:info@porkerhut.com">info@porkerhut.com</a>
                      or call us at
                      <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="tel:+2348057808076">+2348057808076</a>.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="padding: 10px 0">Thank you for being a part of PorkerHut!</p>
                    <p style="padding: 10px 0">Best regards,</p>
                    <p>The PorkerHut Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

const vendorWelcomeEmail = (fullName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Porkerhut | Welcome Email</title>
        <!-- ICONS -->
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />

        <!-- FONTS -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />

        <style>
          * {
            margin: 0;
            box-sizing: border-box;
            font-size: 14px;
          }
          a {
            text-decoration: none;
            color: black;
          }
          h1, h2, h3, p, ul {
            margin: 0;
            padding: 0;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          p {
            line-height: 150%;
          }
        </style>
      </head>

      <body style="font-family: 'Inter', Arial, sans-serif; background: #f8f9fa; padding: 20px;">
        <table style="border-collapse: collapse; margin: 0 auto; max-width: 600px; background: #fff;">
          <tr>
            <td>
              <!-- HEADER -->
              <table style="background: #c5decb; width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; vertical-align: top">
                    <a href="https://porkerhut.com/">
                      <img src="https://i.ibb.co/7NXTjds/porkerhut.png" alt="porkerhut logo" width="150px" height="auto" />
                    </a>
                  </td>
                  <td style="vertical-align: middle; padding: 10px; text-align: end; border: none;">
                    <a href="https://web.facebook.com/profile.php?id=100087600040948" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/HYb9mGJ/entypo-social-facebook.png" style="width: 20px; height: 20px" alt="entypo-social-facebook" />
                    </a>
                    <a href="https://www.instagram.com/porkerhutnaija/" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/MRWHTc5/ri-instagram-fill.png" style="width: 20px; height: 20px" alt="ri-instagram-fill" />
                    </a>
                    <a href="https://www.linkedin.com/in/porker-hut-24b1222b8/" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/R0QDHXZ/akar-icons-linkedin-v1-fill.png" style="width: 20px; height: 20px" alt="akar-icons-linkedin-v1-fill" />
                    </a>
                    <a href="https://x.com/PorkerN87229" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/bJPkLbp/mdi-twitter.png" style="width: 20px; height: 20px" alt="mdi-twitter" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <!-- MAIN CONTENT -->
              <table style="width: 100%; background-color: white; margin: 0px auto 0; border: 0px solid #3333333f; padding: 2%;">
                <tr>
                  <td>
                    <p>Hi <span style="font-weight: 500">${fullName}</span>,</p>
                    <p style="padding: 10px 0">We’re excited to welcome you to the PorkerHut family!</p>
                    <p style="padding-bottom: 10px">
                      Your vendor account has been successfully created, and you’re now part of our growing community of pork suppliers. Here’s a
                      quick overview of what you can do next:
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3 style="font-weight: 500; font-size: 1rem; margin-bottom: 5px">Here’s what to do next:</h3>
                    <ol style="padding-left: 20px">
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        <span style="font-weight: 500">Log In: </span>
                        Access your account here
                        <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="https://porkerhut.com/sign-in?q=vendor">
                          https://porkerhut.com/sign-in?q=vendor
                        </a>
                        to start managing your listings and orders.
                      </li>
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        <span style="font-weight: 500">Add your products: </span>
                        Start adding your pork meat, live pork, and pork feed products.
                      </li>
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        <span style="font-weight: 500">Review Guidelines: </span>
                        Familiarize yourself with our vendor guidelines (if there are any) to ensure a smooth experience and compliance with our policies.
                      </li>
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        <span style="font-weight: 500">Get Support: </span>
                        If you have any questions, our support team is here to help. Contact us at
                        <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="mailto:info@porkerhut.com">
                          info@porkerhut.com
                        </a>
                        or call us at
                        <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="tel:+2348057808076">
                          +2348057808076
                        </a>.
                      </li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>We’re excited to have you on board and look forward to your success on PorkerHut!</p>
                    <p style="padding: 10px 0">Best regards,</p>
                    <p>The PorkerHut Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
const vendorApproved = (fullName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Porkerhut | Approval Email</title>
        <!-- ICONS -->
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />

        <!-- FONTS -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />

        <style>
          * {
            margin: 0;
            box-sizing: border-box;
            font-size: 14px;
          }
          a {
            text-decoration: none;
            color: black;
          }
          h1, h2, h3, p, ul {
            margin: 0;
            padding: 0;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          p {
            line-height: 150%;
          }
        </style>
      </head>

      <body style="font-family: 'Inter', Arial, sans-serif; background: #f8f9fa; padding: 2%; color: #333;">
        <table style="border-collapse: collapse; margin: 0 auto; max-width: 600px; background: #fff;">
          <tr>
            <td>
              <!-- HEADER -->
              <table style="background: #c5decb; width: 100%; border-collapse: collapse">
                <tr>
                  <td style="padding: 10px; vertical-align: top">
                    <a href="https://porkerhut.com/">
                      <img src="https://i.ibb.co/7NXTjds/porkerhut.png" alt="porkerhut logo" width="150px" height="auto" />
                    </a>
                  </td>
                  <td style="vertical-align: middle; padding: 10px; text-align: end; border: none;">
                    <a href="https://web.facebook.com/profile.php?id=100087600040948" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/HYb9mGJ/entypo-social-facebook.png" style="width: 20px; height: 20px" alt="entypo-social-facebook" />
                    </a>
                    <a href="https://www.instagram.com/porkerhutnaija/" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/MRWHTc5/ri-instagram-fill.png" style="width: 20px; height: 20px" alt="ri-instagram-fill" />
                    </a>
                    <a href="https://www.linkedin.com/in/porker-hut-24b1222b8/" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/R0QDHXZ/akar-icons-linkedin-v1-fill.png" style="width: 20px; height: 20px" alt="akar-icons-linkedin-v1-fill" />
                    </a>
                    <a href="https://x.com/PorkerN87229" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/bJPkLbp/mdi-twitter.png" style="width: 20px; height: 20px" alt="mdi-twitter" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <!-- MAIN CONTENT -->
              <table style="width: 100%; background-color: white; margin: 0px auto 0; border: 0px solid #3333333f; padding: 2%;">
                <tr>
                  <td>
                    <p>Hi <span style="font-weight: 500">${fullName}</span>,</p>
                    <p style="padding: 10px 0">Congratulations!</p>
                    <p style="padding-bottom: 10px">
                      We are pleased to inform you that your vendor account application has been
                      <span style="color: #197b30; font-weight: 500">approved</span>. You can now start listing your products and take advantage
                      of our platform’s features.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3 style="font-weight: 500; font-size: 1rem; margin-bottom: 5px">Here’s what to do next:</h3>
                    <ol style="padding-left: 20px">
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        <span style="font-weight: 500">Log In: </span>
                        Access your account here
                        <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="https://porkerhut.com/sign-in?q=vendor">
                          https://porkerhut.com/sign-in?q=vendor
                        </a>
                        to start managing your listings and orders.
                      </li>
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        <span style="font-weight: 500">Add your products: </span>
                        Start adding your pork meat, live pork, and pork feed products.
                      </li>
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        <span style="font-weight: 500">Review Guidelines: </span>
                        Familiarize yourself with our vendor guidelines (if there are any) to ensure a smooth experience and compliance with our policies.
                      </li>
                      <li style="margin-bottom: 10px; line-height: 1.5">
                        <span style="font-weight: 500">Get Support: </span>
                        If you have any questions, our support team is here to help. Contact us at
                        <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="mailto:info@porkerhut.com">
                          info@porkerhut.com
                        </a>
                        or call us at
                        <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="tel:+2348057808076">
                          +2348057808076
                        </a>.
                      </li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>We’re excited to have you on board and look forward to your success on PorkerHut!</p>
                    <p style="padding: 10px 0">Best regards,</p>
                    <p>The PorkerHut Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
const vendorRejected = (fullName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Porkerhut | Rejection Email</title>
        <!-- ICONS -->
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />

        <!-- FONTS -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />

        <style>
          * {
            margin: 0;
            box-sizing: border-box;
            font-size: 14px;
          }
          a {
            text-decoration: none;
            color: black;
          }
          h1, h2, h3, p, ul {
            margin: 0;
            padding: 0;
          }
          img {
            max-width: 100%;
            height: auto;
          }
          p {
            line-height: 150%;
          }
        </style>
      </head>

      <body style="font-family: 'Inter', Arial, sans-serif; background: #f8f9fa; padding: 2%; color: #333;">
        <table style="border-collapse: collapse; margin: 0 auto; max-width: 600px; background: #fff;">
          <tr>
            <td>
              <!-- HEADER -->
              <table style="background: #c5decb; width: 100%; border-collapse: collapse">
                <tr>
                  <td style="padding: 10px; vertical-align: top">
                    <a href="https://porkerhut.com/">
                      <img src="https://i.ibb.co/7NXTjds/porkerhut.png" alt="porkerhut logo" width="150px" height="auto" />
                    </a>
                  </td>
                  <td style="vertical-align: middle; padding: 10px; text-align: end; border: none;">
                    <a href="https://web.facebook.com/profile.php?id=100087600040948" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/HYb9mGJ/entypo-social-facebook.png" style="width: 20px; height: 20px" alt="entypo-social-facebook" />
                    </a>
                    <a href="https://www.instagram.com/porkerhutnaija/" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/MRWHTc5/ri-instagram-fill.png" style="width: 20px; height: 20px" alt="ri-instagram-fill" />
                    </a>
                    <a href="https://www.linkedin.com/in/porker-hut-24b1222b8/" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/R0QDHXZ/akar-icons-linkedin-v1-fill.png" style="width: 20px; height: 20px" alt="akar-icons-linkedin-v1-fill" />
                    </a>
                    <a href="https://x.com/PorkerN87229" style="padding-left: 5px; display: inline-block; color: #333333dd;">
                      <img src="https://i.ibb.co/bJPkLbp/mdi-twitter.png" style="width: 20px; height: 20px" alt="mdi-twitter" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <!-- MAIN CONTENT -->
              <table style="width: 100%; background-color: white; margin: 0px auto 0; border: 0px solid #3333333f; padding: 2%;">
                <tr>
                  <td>
                    <p>Hi <span style="font-weight: 500">${fullName}</span>,</p>
                    <p style="padding: 10px 0">Thank you for applying to become a vendor on PorkerHut.</p>
                    <p style="padding-bottom: 10px">
                      After reviewing your application, we regret to inform you that we are unable to approve your vendor account at this time.
                      This decision was based on specific criteria that were not met or current vendor requirements.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      If you have any questions or would like to receive feedback on your application, please contact us at
                      <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="mailto:info@porkerhut.com">info@porkerhut.com</a>
                      or call us at
                      <a style="color: #197b30; font-weight: 500; text-decoration: underline;" href="tel:+2348057808076">+2348057808076</a>.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="padding: 10px 0">
                      Thank you for your interest in PorkerHut. We wish you the best in your future endeavors and encourage you to apply again in the future.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="padding: 10px 0">Best regards,</p>
                    <p>The PorkerHut Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
const commissionAndDeliveryRate = (fullName, deliveryRate, CommissionRate) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Commission And Delivery Rate</title>
    <!-- ICONS -->
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />

    <!-- FONTS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
      rel="stylesheet"
    />

    <style>
      * {
        margin: 0;
        box-sizing: border-box;
        font-size: 14px;
      }
      a {
        text-decoration: none;
        color: black;
      }
      h1,
      h2,
      h3,
      p,
      ul {
        margin: 0;
        padding: 0;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      p {
        line-height: 150%;
      }
    </style>
  </head>

  <body
    style="
      font-family: 'Inter', Arial, sans-serif;
      background: #f8f9fa;
      padding: 2%;
      color: #333;
    "
  >
    <table
      style="
        border-collapse: collapse;
        margin: 0 auto;
        max-width: 600px;
        background: #fff;
      "
      ;
    >
      <tr>
        <td>
          <!-- HEADER -->
          <table
            style="background: #c5decb; width: 100%; border-collapse: collapse"
          >
            <tr>
              <td style="padding: 10px; vertical-align: top">
                <a href="https://porkerhut.com/"
                  ><img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/Frame%20107.png?alt=media&token=9ccf6274-da10-4a5d-9136-783ab434a1a7"
                    alt="porkerhut logo"
                    width="150px"
                    height="auto"
                /></a>
              </td>
              <td
                style="
                  vertical-align: middle;
                  padding: 10px;
                  text-align: end;
                  border: none;
                "
              >
                <a
                  href="https://web.facebook.com/profile.php?id=100087600040948"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/entypo-social_facebook.png?alt=media&token=14b5f31e-a0ef-47cc-a47a-100f11e2424e"
                    style="width: 20px; height: 20px"
                    alt="entypo-social-facebook"
                  />
                </a>
                <a
                  href="https://www.instagram.com/porkerhutnaija/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/ri_instagram-fill.png?alt=media&token=67d961ba-74ce-4e4d-a479-390dfa72f971"
                    style="width: 20px; height: 20px"
                    alt="ri-instagram-fill"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/porker-hut-24b1222b8/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/akar-icons_linkedin-v1-fill.png?alt=media&token=82dd75a5-34c4-44aa-8e07-c42b1cf1ee1b"
                    style="width: 20px; height: 20px"
                    alt="akar-icons-linkedin-v1-fill"
                  />
                </a>
                <a
                  href="https://x.com/PorkerN87229"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/mdi_twitter.png?alt=media&token=4ce84c2a-6dcc-4a70-bd6c-d09d18ff0c28"
                    style="width: 20px; height: 20px"
                    alt="mdi-twitter"
                  />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <!-- MAIN CONTENTs -->
          <table
            style="
              width: 100%;
              background-color: white;
              margin: 0px auto 0;
              border: 0px solid #3333333f;
              padding: 2%;
            "
          >
            <tr>
              <td>
                <p>Hi <span style="font-weight: 500">${fullName}</span>,</p>
                <p style="padding: 10px 0">
                  We wanted to inform you of recent updates to the commission
                  and delivery rates on PorkerHut.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="padding-top: 10px">New Rates:</p>
                <ul style="list-style: none">
                  <li style="padding-top: 10px">
                    - Commission Rate: ${CommissionRate}%
                  </li>
                  <li style="padding-top: 10px">
                    - Delivery Rate: ${deliveryRate}%
                  </li>
                </ul>

                <p style="padding: 10px 0">
                  These changes will take effect from
                  <strong>(${new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })})</strong>.
                  Please review your pricing and adjust your listings
                  accordingly.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="padding: 14px 0">
                  If you have any questions or need further clarification, feel
                  free to contact us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="mailto:info@porkerhut.com"
                    >info@porkerhut.com</a
                  >
                  or call us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="tel:+2348057808076"
                    >+2348057808076</a
                  >.
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p style="padding: 16px 0">
                  Thank you for your attention to this matter.
                </p>
                <p style="padding: 10px 0">Best regards,</p>
                <p>The PorkerHut Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
};
const activateProduct = (fullName, products) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Porkerhut | Welcome Email</title>
    <!-- ICONS -->
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />

    <!-- FONTS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
      rel="stylesheet"
    />

    <style>
      * {
        margin: 0;
        box-sizing: border-box;
        font-size: 14px;
      }
      a {
        text-decoration: none;
        color: black;
      }
      h1,
      h2,
      h3,
      p,
      ul {
        margin: 0;
        padding: 0;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      p {
        line-height: 150%;
      }
    </style>
  </head>

  <body
    style="
      font-family: 'Inter', Arial, sans-serif;
      background: #f8f9fa;
      padding: 2%;
      color: #333;
    "
  >
    <table
      style="
        border-collapse: collapse;
        margin: 0 auto;
        max-width: 600px;
        background: #fff;
      "
      ;
    >
      <tr>
        <td>
          <!-- HEADER -->
          <table
            style="background: #c5decb; width: 100%; border-collapse: collapse"
          >
            <tr>
              <td style="padding: 10px; vertical-align: top">
                <a href="https://porkerhut.com/"
                  ><img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/Frame%20107.png?alt=media&token=9ccf6274-da10-4a5d-9136-783ab434a1a7"
                    alt="porkerhut logo"
                    width="150px"
                    height="auto"
                /></a>
              </td>
              <td
                style="
                  vertical-align: middle;
                  padding: 10px;
                  text-align: end;
                  border: none;
                "
              >
                <a
                  href="https://web.facebook.com/profile.php?id=100087600040948"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/entypo-social_facebook.png?alt=media&token=14b5f31e-a0ef-47cc-a47a-100f11e2424e"
                    style="width: 20px; height: 20px"
                    alt="entypo-social-facebook"
                  />
                </a>
                <a
                  href="https://www.instagram.com/porkerhutnaija/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/ri_instagram-fill.png?alt=media&token=67d961ba-74ce-4e4d-a479-390dfa72f971"
                    style="width: 20px; height: 20px"
                    alt="ri-instagram-fill"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/porker-hut-24b1222b8/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/akar-icons_linkedin-v1-fill.png?alt=media&token=82dd75a5-34c4-44aa-8e07-c42b1cf1ee1b"
                    style="width: 20px; height: 20px"
                    alt="akar-icons-linkedin-v1-fill"
                  />
                </a>
                <a
                  href="https://x.com/PorkerN87229"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/mdi_twitter.png?alt=media&token=4ce84c2a-6dcc-4a70-bd6c-d09d18ff0c28"
                    style="width: 20px; height: 20px"
                    alt="mdi-twitter"
                  />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <!-- MAIN CONTENTs -->
          <table
            style="
              width: 100%;
              background-color: white;
              margin: 0px auto 0;
              border: 0px solid #3333333f;
              padding: 2%;
            "
          >
            <tr>
              <td>
                <p>Hi <span style="font-weight: 500">${fullName}</span>,</p>
                <p style="padding: 10px 0">
                  We’re pleased to inform you that your product listing has been
                  approved and is now live on PorkerHut!
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="padding-bottom: 3px">Product Details:</p>
                <ul style="list-style: none">
                  <li style="margin-top: 10px">
                    - Product Name: ${products.productName}
                  </li>
                  <li style="margin-top: 10px">
                    - Listing URL: <a href="https://porkerhut.com/product/${products.productId}">View Product</a>
                  </li>
                </ul>
                <p style="padding: 16px 0">
                  You can view and manage your product in your vendor dashboard
                  <a href="https://porkerhut.com/sign-in?q=vendor">here</a>.
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p style="padding: 14px 0">
                  If you have any questions or need further assistance, please
                  contact us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="mailto:info@porkerhut.com"
                    >info@porkerhut.com</a
                  >
                  or call us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="tel:+2348057808076"
                    >+2348057808076</a
                  >.
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p style="padding: 16px 0">
                  Congratulations and thank you for choosing PorkerHut!
                </p>
                <p style="padding: 10px 0">Best regards,</p>
                <p>The PorkerHut Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
};
const rejectedProduct = (fullName) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Porkerhut | Welcome Email</title>
    <!-- ICONS -->
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />

    <!-- FONTS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
      rel="stylesheet"
    />

    <style>
      * {
        margin: 0;
        box-sizing: border-box;
        font-size: 14px;
      }
      a {
        text-decoration: none;
        color: black;
      }
      h1,
      h2,
      h3,
      p,
      ul {
        margin: 0;
        padding: 0;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      p {
        line-height: 150%;
      }
    </style>
  </head>

  <body
    style="
      font-family: 'Inter', Arial, sans-serif;
      background: #f8f9fa;
      padding: 2%;
      color: #333;
    "
  >
    <table
      style="
        border-collapse: collapse;
        margin: 0 auto;
        max-width: 600px;
        background: #fff;
      "
      ;
    >
      <tr>
        <td>
          <!-- HEADER -->
          <table
            style="background: #c5decb; width: 100%; border-collapse: collapse"
          >
            <tr>
              <td style="padding: 10px; vertical-align: top">
                <a href="https://porkerhut.com/"
                  ><img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/Frame%20107.png?alt=media&token=9ccf6274-da10-4a5d-9136-783ab434a1a7"
                    alt="porkerhut logo"
                    width="150px"
                    height="auto"
                /></a>
              </td>
              <td
                style="
                  vertical-align: middle;
                  padding: 10px;
                  text-align: end;
                  border: none;
                "
              >
                <a
                  href="https://web.facebook.com/profile.php?id=100087600040948"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/entypo-social_facebook.png?alt=media&token=14b5f31e-a0ef-47cc-a47a-100f11e2424e"
                    style="width: 20px; height: 20px"
                    alt="entypo-social-facebook"
                  />
                </a>
                <a
                  href="https://www.instagram.com/porkerhutnaija/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/ri_instagram-fill.png?alt=media&token=67d961ba-74ce-4e4d-a479-390dfa72f971"
                    style="width: 20px; height: 20px"
                    alt="ri-instagram-fill"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/porker-hut-24b1222b8/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/akar-icons_linkedin-v1-fill.png?alt=media&token=82dd75a5-34c4-44aa-8e07-c42b1cf1ee1b"
                    style="width: 20px; height: 20px"
                    alt="akar-icons-linkedin-v1-fill"
                  />
                </a>
                <a
                  href="https://x.com/PorkerN87229"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/mdi_twitter.png?alt=media&token=4ce84c2a-6dcc-4a70-bd6c-d09d18ff0c28"
                    style="width: 20px; height: 20px"
                    alt="mdi-twitter"
                  />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <!-- MAIN CONTENTs -->
          <table
            style="
              width: 100%;
              background-color: white;
              margin: 0px auto 0;
              border: 0px solid #3333333f;
              padding: 2%;
            "
          >
            <tr>
              <td>
                <p>Hi <span style="font-weight: 500">${fullName}</span>,</p>
                <p style="padding: 10px 0">
                  We regret to inform you that your product listing has been
                  rejected.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="padding: 10px 0">
                  Reason for Rejection: (Brief reason)
                </p>
                <p style="padding-bottom: 3px">Next Steps:</p>
                <ul style="list-style: none">
                  <li style="margin-top: 10px">
                    - Review Feedback: (If applicable, provide specific
                    feedback)
                  </li>
                  <li style="margin-top: 10px">
                    - Revise and Resubmit: (Instructions on how to make changes,
                    if applicable)
                  </li>
                </ul>

                <p style="padding: 16px 0">
                  You can view and manage your products in your vendor dashboard
                  <a href="https://porkerhut.com/sign-in?q=vendor">here</a>.
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p style="padding: 14px 0">
                  If you have any questions or need further assistance, please
                  contact us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="mailto:info@porkerhut.com"
                    >info@porkerhut.com</a
                  >
                  or call us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="tel:+2348057808076"
                    >+2348057808076</a
                  >.
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p style="padding: 16px 0">Thank you for your understanding.</p>
                <p style="padding: 10px 0">Best regards,</p>
                <p>The PorkerHut Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
};
const deleteCategory = (fullName, categoryName) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Porkerhut | Welcome Email</title>
    <!-- ICONS -->
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />

    <!-- FONTS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
      rel="stylesheet"
    />

    <style>
      * {
        margin: 0;
        box-sizing: border-box;
        font-size: 14px;
      }
      a {
        text-decoration: none;
        color: black;
      }
      h1,
      h2,
      h3,
      p,
      ul {
        margin: 0;
        padding: 0;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      p {
        line-height: 150%;
      }
    </style>
  </head>

  <body
    style="
      font-family: 'Inter', Arial, sans-serif;
      background: #f8f9fa;
      padding: 2%;
      color: #333;
    "
  >
    <table
      style="
        border-collapse: collapse;
        margin: 0 auto;
        max-width: 600px;
        background: #fff;
      "
      ;
    >
      <tr>
        <td>
          <!-- HEADER -->
          <table
            style="background: #c5decb; width: 100%; border-collapse: collapse"
          >
            <tr>
              <td style="padding: 10px; vertical-align: top">
                <a href="https://porkerhut.com/"
                  ><img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/Frame%20107.png?alt=media&token=9ccf6274-da10-4a5d-9136-783ab434a1a7"
                    alt="porkerhut logo"
                    width="150px"
                    height="auto"
                /></a>
              </td>
              <td
                style="
                  vertical-align: middle;
                  padding: 10px;
                  text-align: end;
                  border: none;
                "
              >
                <a
                  href="https://web.facebook.com/profile.php?id=100087600040948"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/entypo-social_facebook.png?alt=media&token=14b5f31e-a0ef-47cc-a47a-100f11e2424e"
                    style="width: 20px; height: 20px"
                    alt="entypo-social-facebook"
                  />
                </a>
                <a
                  href="https://www.instagram.com/porkerhutnaija/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/ri_instagram-fill.png?alt=media&token=67d961ba-74ce-4e4d-a479-390dfa72f971"
                    style="width: 20px; height: 20px"
                    alt="ri-instagram-fill"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/porker-hut-24b1222b8/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/akar-icons_linkedin-v1-fill.png?alt=media&token=82dd75a5-34c4-44aa-8e07-c42b1cf1ee1b"
                    style="width: 20px; height: 20px"
                    alt="akar-icons-linkedin-v1-fill"
                  />
                </a>
                <a
                  href="https://x.com/PorkerN87229"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/mdi_twitter.png?alt=media&token=4ce84c2a-6dcc-4a70-bd6c-d09d18ff0c28"
                    style="width: 20px; height: 20px"
                    alt="mdi-twitter"
                  />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <!-- MAIN CONTENTs -->
          <table
            style="
              width: 100%;
              background-color: white;
              margin: 0px auto 0;
              border: 0px solid #3333333f;
              padding: 2%;
            "
          >
            <tr>
              <td>
                <p>Hi <span style="font-weight: 500">${fullName}</span>,</p>
                <p style="padding: 10px 0">
                  We wanted to inform you that the following category has been deleted
                </p>
                <p>- Category Name: ${categoryName}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="padding-top: 10px">What This Means for You:</p>
                <p style="padding: 6px 0">
                  If you had products listed under this category, please
                  (provide instructions, e.g., "relist them under a new
                  category" or "contact our support team for assistance”).
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p style="padding: 14px 0">
                  If you have any questions or need further assistance, please
                  contact us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="mailto:info@porkerhut.com"
                    >info@porkerhut.com</a
                  >
                  or call us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="tel:+2348057808076"
                    >+2348057808076</a
                  >.
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p style="padding: 16px 0">Thank you for your attention.</p>
                <p style="padding: 10px 0">Best regards,</p>
                <p>The PorkerHut Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
};
const disableCategory = (fullName, categoryName) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Porkerhut | Welcome Email</title>
    <!-- ICONS -->
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />

    <!-- FONTS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
      rel="stylesheet"
    />

    <style>
      * {
        margin: 0;
        box-sizing: border-box;
        font-size: 14px;
      }
      a {
        text-decoration: none;
        color: black;
      }
      h1,
      h2,
      h3,
      p,
      ul {
        margin: 0;
        padding: 0;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      p {
        line-height: 150%;
      }
    </style>
  </head>

  <body
    style="
      font-family: 'Inter', Arial, sans-serif;
      background: #f8f9fa;
      padding: 2%;
      color: #333;
    "
  >
    <table
      style="
        border-collapse: collapse;
        margin: 0 auto;
        max-width: 600px;
        background: #fff;
      "
      ;
    >
      <tr>
        <td>
          <!-- HEADER -->
          <table
            style="background: #c5decb; width: 100%; border-collapse: collapse"
          >
            <tr>
              <td style="padding: 10px; vertical-align: top">
                <a href="https://porkerhut.com/"
                  ><img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/Frame%20107.png?alt=media&token=9ccf6274-da10-4a5d-9136-783ab434a1a7"
                    alt="porkerhut logo"
                    width="150px"
                    height="auto"
                /></a>
              </td>
              <td
                style="
                  vertical-align: middle;
                  padding: 10px;
                  text-align: end;
                  border: none;
                "
              >
                <a
                  href="https://web.facebook.com/profile.php?id=100087600040948"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/entypo-social_facebook.png?alt=media&token=14b5f31e-a0ef-47cc-a47a-100f11e2424e"
                    style="width: 20px; height: 20px"
                    alt="entypo-social-facebook"
                  />
                </a>
                <a
                  href="https://www.instagram.com/porkerhutnaija/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/ri_instagram-fill.png?alt=media&token=67d961ba-74ce-4e4d-a479-390dfa72f971"
                    style="width: 20px; height: 20px"
                    alt="ri-instagram-fill"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/porker-hut-24b1222b8/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/akar-icons_linkedin-v1-fill.png?alt=media&token=82dd75a5-34c4-44aa-8e07-c42b1cf1ee1b"
                    style="width: 20px; height: 20px"
                    alt="akar-icons-linkedin-v1-fill"
                  />
                </a>
                <a
                  href="https://x.com/PorkerN87229"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/mdi_twitter.png?alt=media&token=4ce84c2a-6dcc-4a70-bd6c-d09d18ff0c28"
                    style="width: 20px; height: 20px"
                    alt="mdi-twitter"
                  />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <!-- MAIN CONTENTs -->
          <table
            style="
              width: 100%;
              background-color: white;
              margin: 0px auto 0;
              border: 0px solid #3333333f;
              padding: 2%;
            "
          >
            <tr>
              <td>
                <p>Hi <span style="font-weight: 500">${fullName}</span>,</p>
                <p style="padding: 10px 0">
                  We wanted to inform you that the following category has been disabled
                </p>
                <p>- Category Name: ${categoryName}</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="padding-top: 10px">What This Means for You:</p>
                <p style="padding: 6px 0">
                  If you had products listed under this category, please
                  (provide instructions, e.g., "relist them under a new
                  category" or "contact our support team for assistance”).
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p style="padding: 14px 0">
                  If you have any questions or need further assistance, please
                  contact us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="mailto:info@porkerhut.com"
                    >info@porkerhut.com</a
                  >
                  or call us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="tel:+2348057808076"
                    >+2348057808076</a
                  >.
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p style="padding: 16px 0">Thank you for your attention.</p>
                <p style="padding: 10px 0">Best regards,</p>
                <p>The PorkerHut Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
};
const announcementEmail = (fullName, subject, content) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Porkerhut | Welcome Email</title>
    <!-- ICONS -->
    <link
      href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      rel="stylesheet"
    />

    <!-- FONTS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
      rel="stylesheet"
    />

    <style>
      * {
        margin: 0;
        box-sizing: border-box;
        font-size: 14px;
      }
      a {
        text-decoration: none;
        color: black;
      }
      h1,
      h2,
      h3,
      p,
      ul {
        margin: 0;
        padding: 0;
      }
      img {
        max-width: 100%;
        height: auto;
      }
      p {
        line-height: 150%;
      }
    </style>
  </head>

  <body
    style="
      font-family: 'Inter', Arial, sans-serif;
      background: #f8f9fa;
      padding: 2%;
      color: #333;
    "
  >
    <table
      style="
        border-collapse: collapse;
        margin: 0 auto;
        max-width: 600px;
        background: #fff;
      "
      ;
    >
      <tr>
        <td>
          <!-- HEADER -->
          <table
            style="background: #c5decb; width: 100%; border-collapse: collapse"
          >
            <tr>
              <td style="padding: 10px; vertical-align: top">
                <a href="https://porkerhut.com/"
                  ><img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/Frame%20107.png?alt=media&token=9ccf6274-da10-4a5d-9136-783ab434a1a7"
                    alt="porkerhut logo"
                    width="150px"
                    height="auto"
                /></a>
              </td>
              <td
                style="
                  vertical-align: middle;
                  padding: 10px;
                  text-align: end;
                  border: none;
                "
              >
                <a
                  href="https://web.facebook.com/profile.php?id=100087600040948"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/entypo-social_facebook.png?alt=media&token=14b5f31e-a0ef-47cc-a47a-100f11e2424e"
                    style="width: 20px; height: 20px"
                    alt="entypo-social-facebook"
                  />
                </a>
                <a
                  href="https://www.instagram.com/porkerhutnaija/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/ri_instagram-fill.png?alt=media&token=67d961ba-74ce-4e4d-a479-390dfa72f971"
                    style="width: 20px; height: 20px"
                    alt="ri-instagram-fill"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/in/porker-hut-24b1222b8/"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/akar-icons_linkedin-v1-fill.png?alt=media&token=82dd75a5-34c4-44aa-8e07-c42b1cf1ee1b"
                    style="width: 20px; height: 20px"
                    alt="akar-icons-linkedin-v1-fill"
                  />
                </a>
                <a
                  href="https://x.com/PorkerN87229"
                  style="
                    padding-left: 5px;
                    display: inline-block;
                    color: #333333dd;
                  "
                >
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/porkerhut-email.appspot.com/o/mdi_twitter.png?alt=media&token=4ce84c2a-6dcc-4a70-bd6c-d09d18ff0c28"
                    style="width: 20px; height: 20px"
                    alt="mdi-twitter"
                  />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <!-- MAIN CONTENTs -->
          <table
            style="
              width: 100%;
              background-color: white;
              margin: 0px auto 0;
              border: 0px solid #3333333f;
              padding: 2%;
            "
          >
            <tr>
              <td>
                <p>Hi <span style="font-weight: 500">${fullName}</span>,</p>
                <p style="padding: 10px 0">
                  We have an important announcement for you!
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="padding-bottom: 3px">Details:</p>
                <ul style="list-style: none">
                  <li style="margin-top: 10px">${subject}</li>
                  <li style="margin-top: 10px">
                    ${content}
                  </li>
                  <li style="margin-top: 10px">
                    - Action Required: (If applicable, specify any actions
                    needed)
                  </li>
                </ul>
              </td>
            </tr>

            <tr>
              <td>
                <p style="padding: 14px 0">
                  We encourage you to review this announcement and take any
                  necessary actions. If you have any questions, feel free to
                  reach out to us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="mailto:info@porkerhut.com"
                    >info@porkerhut.com</a
                  >
                  or call us at
                  <a
                    style="
                      color: #197b30;
                      font-weight: 500;
                      text-decoration: underline;
                    "
                    href="tel:+2348057808076"
                    >+2348057808076</a
                  >.
                </p>
              </td>
            </tr>

            <tr>
              <td>
                <p style="padding: 10px 0">Thanks for your attention!</p>
                <p style="padding: 10px 0">Best regards,</p>
                <p>The PorkerHut Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
};
module.exports = {
  generateWelcomeEmail,
  activateProduct,
  rejectedProduct,
  announcementEmail,
  disableCategory,
  generateOrderConfirmationEmail,
  generateOrderCancellationEmail,
  generateNewWelcomeEmail,
  resetEmail,
  deleteCategory,
  commissionAndDeliveryRate,
  vendorRejected,
  activateEmail,
  deactivateEmail,
  vendorWelcomeEmail,
  vendorApproved,
  generateOrderDeliveredEmail,
};
