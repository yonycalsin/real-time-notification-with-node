const { Router } = require("express")
const router = Router()

const webpush = require("../webpush")
let subs;

router.post("/subscription", async (req, res) => {
    subs = req.body
    return res.status(200).json({
        message: "Subscribed successfully!"
    })
})

router.post("/new-message", async (req, res) => {
    const { message, title } = req.body
    const payload = JSON.stringify({
        title,
        message
    })
    try {
        await webpush.sendNotification(subs, payload)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;