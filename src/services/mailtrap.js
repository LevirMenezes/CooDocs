import { MailtrapClient } from "mailtrap"

export const sendEmail = async (to, subject, body) => {
    const options = {
        token: process.env.MAILTRAP_TOKEN
    };

    const mailtrap = new MailtrapClient(options);

    try {
        await mailtrap.send({
            from: { name: "CooDocs", email: "process.env.EMAIL_USER" },
            to: [{ email: to}],
            subject,
            text: body,
            html: body
        });

        return true
    } catch (err) {
        return false;
    }
}