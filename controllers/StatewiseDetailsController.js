const fetch = require('node-fetch');

module.exports.getBedsController = async(state) => {
    if (!state) {
        return {
            code: 400,
            payload: {}
        }
    }

    try {
        let response = await fetch("https://api.rootnet.in/covid19-in/hospitals/beds")
        if (response.status == 200) {
            let responseJSON = await response.json()
            let statesArray = responseJSON.data.regional;
            let message = "No error occured"
            let arrayToSend = statesArray.filter((v) => {
                if (v.state == state)
                    return true
                else
                    return false
            })
            if (arrayToSend.length == 0) {
                message = `${state} not found, defaulting to Delhi`
                arrayToSend = statesArray.filter((v) => {
                    if (v.state == "Delhi")
                        return true
                    else
                        return false
                })
            }
            return {
                code: 200,
                payload: {
                    error: false,
                    message: "No error occured",
                    beds: arrayToSend,
                }
            }
        } else {
            throw "err"
        }
    } catch (e) {
        return { code: 403, payload: {} }
    }

}

module.exports.getHelplineController = async(state) => {
    if (!state) {
        return {
            code: 400,
            payload: {}
        }
    }

    try {
        let response = await fetch("https://api.rootnet.in/covid19-in/contacts")
        if (response.status == 200) {
            let responseJSON = await response.json()
            let statesArray = responseJSON.data.contacts.regional;
            let message = "No error occured"
            let arrayToSend = statesArray.filter((v) => {
                if (v.loc == state)
                    return true
                else
                    return false
            })
            if (arrayToSend.length == 0) {
                message = `${state} not found, defaulting to Delhi`
                arrayToSend = statesArray.filter((v) => {
                    if (v.state == "Delhi")
                        return true
                    else
                        return false
                })
            }
            return {
                code: 200,
                payload: {
                    error: false,
                    message: "No error occured",
                    beds: arrayToSend,
                }
            }
        } else {
            throw "err"
        }
    } catch (e) {
        return {
            code: 403,
            payload: {}
        }
    }
}


module.exports.getMedicalCollegesController = async(state) => {
    if (!state) {
        return {
            code: 400,
            payload: {}
        }
    }

    try {
        let response = await fetch("https://api.rootnet.in/covid19-in/hospitals/medical-colleges")
        if (response.status == 200) {
            let responseJSON = await response.json()
            let statesArray = responseJSON.data.medicalColleges;
            let message = "No error occured"
            let arrayToSend = statesArray.filter((v) => {
                if (v.state == state)
                    return true
                else
                    return false
            })
            if (arrayToSend.length == 0) {
                message = `${state} not found, defaulting to Delhi`
                arrayToSend = statesArray.filter((v) => {
                    if (v.state == "Delhi")
                        return true
                    else
                        return false
                })
            }
            return {
                code: 200,
                payload: {
                    error: false,
                    message: "No error occured",
                    beds: arrayToSend,
                }
            }
        } else {
            throw "err"
        }
    } catch (e) {
        return {
            code: 403,
            payload: {}
        }
    }
}