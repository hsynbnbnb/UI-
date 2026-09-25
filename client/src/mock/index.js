const responses = {
    'GET /category/getall': {
        code: 200,
        message: 'OK',
        data: []
    },
    'GET /search/hot/get': {
        code: 200,
        message: 'OK',
        data: []
    }
}

export function mockRequest(method, url, data, config) {
    const path = url.split('?')[0]
    const key = `${method.toUpperCase()} ${path}`
    const response = responses[key]

    if (response) {
        return Promise.resolve({
            data: JSON.parse(JSON.stringify(response)),
            config
        })
    }

    return Promise.resolve({
        data: {
            code: 200,
            message: 'Mock OK',
            data: null
        },
        config
    })
}
