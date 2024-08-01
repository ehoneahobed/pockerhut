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
const generateOrderCancellationEmail = (
  orderNumber,
  products,
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
const generateOrderDeliveredEmail = (
  orderNumber,
  products,
  customerName
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
                day: "numeric"
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
                .join('')}
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

const resetEmail = (resetLink) =>{
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
}


module.exports = {
  generateWelcomeEmail,
  generateOrderConfirmationEmail,
  generateOrderCancellationEmail,
  generateNewWelcomeEmail,
  resetEmail,
  generateOrderDeliveredEmail
};
