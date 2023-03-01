const axios = require('axios');

const getInfoCamaraByUrl = require('../../helpers/getInfoCamaraByUrl')

class VideoController {
    async viewVideos(req, res){
        const camara = await getInfoCamaraByUrl(req)

        let pagination = {
            anterior: '',
            proximo: '',
        }

        res.render("user/videos/videosPage", { pagination, camara});
    }

    async getVideosList(req, res) {
        try {
            const camara = await getInfoCamaraByUrl(req)

            let url = 'https://www.googleapis.com/youtube/v3/search'
            let channelId = camara.ApiVideos.replace('https://www.youtube.com/channel/', '')
            let page = req.header('page-header')
            let status = req.header('status-header')

            let pagination = {
                anterior: '',
                proximo: ''
            }

            if(status == 'isHome'){
                const response = await axios.get(url, {
                    params: {
                        pageToken: '',
                        key: process.env.GOOGLE_API_KEY,
                        channelId: channelId,
                        part: 'snippet,id',
                        maxResults: 10,
                        resultsNumber: '',
                        order: 'date',
                    }
                });
                
                const videos = response.data.items

                pagination.proximo = response.data.nextPageToken

                return res.status(200).json({ status: "success", videos, pagination })
            }

            if(status == 'isNext' || status == 'isPrevius'){
                console.log(page)

                const response = await axios.get(url, {
                    params: {
                        pageToken: page,
                        key: process.env.GOOGLE_API_KEY,
                        channelId: channelId,
                        part: 'snippet,id',
                        maxResults: 10,
                        resultsNumber: '',
                        order: 'date',
                    }
                });
                
                const videos = response.data.items
                
                if(response.data.nextPageToken)
                    pagination.proximo = response.data.nextPageToken

                if(response.data.prevPageToken)
                    pagination.anterior = response.data.prevPageToken

                return res.status(200).json({ status: "success", videos, pagination })
            }
    
        } catch (error) {
          console.log(error)
          return res.status(500).json({ status: "false", message: "Não foi possível realizar essa operação, tente novamente mais tarde" })
        }
      }
}

module.exports = new VideoController
