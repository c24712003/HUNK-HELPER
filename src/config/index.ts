export default {
    port: process.env.PORT || 8080,
    line_bot: {
        channelId: 0,
        channelSecret: '',
        channelAccessToken: '',
        pushMessageUserId: '',
        richMenuId: ''
    },
    movie_tmdb: {
        apiKey: ''  
    },
    wger: {
        apiKey: 'Token '
    },
    fire_store: {
        serviceAccount: require('.')
    }
}