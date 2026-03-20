import emailjs from "@emailjs/browser";

export const sendOrderEmail = async (user, cart, address) => {
  // console.log(user);
  
  try {
    const templateParams = {
      user_name: user.name,
      email: user.email,
      address: address,
      order_items: cart.map(item => `${item.name} (x${item.qty})`).join(", "),
    };

    await emailjs.send(
      "service_tw2efef",
      "template_vg0qrml",
      templateParams,
      "RHnMr1SdOX55l6_pn"
    );

    // console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email error:", error);
  }
};


export const sendLoginEmail = async (data) => {
  // console.log(data);
  
  if (!data?.email) {
    console.error("No email found");
    return;
  }

  try {
    const templateParams = {
      user_name: data.name || "User",
      email: data.email,
    };

    await emailjs.send(
      "service_tw2efef",   // replace
      "template_pw90ix8",  // replace
      templateParams,
      "RHnMr1SdOX55l6_pn"    // replace
    );

    // console.log("✅ Login email sent");
  } catch (error) {
    console.error("❌ Email error:", error);
  }
};