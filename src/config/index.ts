export default {
    port: process.env.PORT || 8080,
    line_bot: {
        channelId: 1656308867,
        channelSecret: 'a7374fc2a3252312886268032680146f',
        channelAccessToken: 'fp22kjPmSL51wdKGM60jsdgIC2e78eYp9vF37dFZazP9mCN866cXOkG',
        pushMessageUserId: 'U202121644583b43b4c87b6cdb09b0dad',
        richMenuId: 'richmenu-2f725826e55577b536b72ad51da44566'
    },
    movie_tmdb: {
        apiKey: 'b09708e1599c86aac2d007b9bfb0f771'  
    },
    wger: {
        apiKey: 'Token fd7d59694c50249b9be22a0c09b3e8214002b97a'
    },
    fire_store: {
        serviceAccount: require('../hunk-helper-954c1de0394c.json')
    }
}