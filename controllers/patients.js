const Patients = require('../models/patients');
const logger = require('../logging/logger');
const sgMail = require('@sendgrid/mail');
require('dotenv').config()
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class PatientController {
  static async fetchRecoveredPatients(startDate, endDate, startAge, endAge, gender, state) {
    try {
      let patients
      if(gender){
        patients = await Patients.aggregate([
          {
            $match: {
              status: "Recovered",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              gender: gender,
              state: state
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum : 1}
            }
          }
        ]);
      } else{
        patients = await Patients.aggregate([
          {
            $match: {
              status: "Recovered",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              state: state
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum : 1}
            }
          }
        ]);
      }
      return {
        error: false,
        message: 'Details have been fetched',
        code: 200,
        recoveredPatients: patients
      };
    } catch (err) {
      logger.error('An Error Occurred: ' + err);
      return {
        error: true,
        message: 'An error occurred: ' + err,
        code: 500
      };
    }
  }

  static async fetchDeceasedPatients(startDate, endDate, startAge, endAge, gender, state) {
    try {
      let patients
      if(gender){
        patients = await Patients.aggregate([
          {
            $match: {
              status: "Deceased",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              gender: gender,
              state: state
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum : 1}
            }
          }
        ]);
      } else {
        patients = await Patients.aggregate([
          {
            $match: {
              status: "Deceased",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              state: state
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum: 1}
            }
          }
        ]);
      }
      return {
        error: false,
        message: 'Details have been fetched',
        code: 200,
        deceasedPatients: patients
      };
    } catch (err) {
      logger.error('An Error Occurred: ' + err);
      return {
        error: true,
        message: 'An error occurred: ' + err,
        code: 500
      };
    }
  }

  static async fetchAllPatients(startDate, endDate, startAge, endAge, gender, state) {
    try {
      let deceasedPatients
      let recoveredPatients
      if(gender){
        deceasedPatients = await Patients.aggregate([
          {
            $match: {
              status: "Deceased",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              gender: gender,
              state: state
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum : 1}
            }
          }
        ]);
        recoveredPatients = await Patients.aggregate([
          {
            $match: {
              status: "Recovered",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              gender: gender,
              state: state
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum : 1}
            }
          }
        ]);
      } else {
        deceasedPatients = await Patients.aggregate([
          {
            $match: {
              status: "Deceased",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              state: state
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum: 1}
            }
          }
        ]);
        recoveredPatients = await Patients.aggregate([
          {
            $match: {
              status: "Recovered",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              state: state
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum: 1}
            }
          }
        ]);
      }
      return {
        error: false,
        message: 'Details have been fetched',
        code: 200,
        deceasedPatients: deceasedPatients,
        recoveredPatients: recoveredPatients
      };
    } catch (err) {
      logger.error('An Error Occurred: ' + err);
      return {
        error: true,
        message: 'An error occurred: ' + err,
        code: 500
      };
    }
  }

  static async fetchRecoveredPatientsIndia(startDate, endDate, startAge, endAge, gender) {
    try {
      let patients
      if(gender){
        patients = await Patients.aggregate([
          {
            $match: {
              status: "Recovered",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              gender: gender
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum : 1}
            }
          }
        ]);
      } else{
        patients = await Patients.aggregate([
          {
            $match: {
              status: "Recovered",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum : 1}
            }
          }
        ]);
      }
      return {
        error: false,
        message: 'Details have been fetched',
        code: 200,
        recoveredPatients: patients
      };
    } catch (err) {
      logger.error('An Error Occurred: ' + err);
      return {
        error: true,
        message: 'An error occurred: ' + err,
        code: 500
      };
    }
  }

  static async fetchDeceasedPatientsIndia(startDate, endDate, startAge, endAge, gender) {
    try {
      let patients;
      if(gender){
        patients = await Patients.aggregate([
          {
            $match: {
              status: "Deceased",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              gender: gender
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum : 1}
            }
          }
        ]);
      } else {
        patients = await Patients.aggregate([
          {
            $match: {
              status: "Deceased",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum : 1}
            }
          }
        ]);
      }
      return {
        error: false,
        message: 'Details have been fetched',
        code: 200,
        deceasedPatients: patients
      };
    } catch (err) {
      logger.error('An Error Occurred: ' + err);
      return {
        error: true,
        message: 'An error occurred: ' + err,
        code: 500
      };
    }
  }

  static async fetchAllPatientsIndia(startDate, endDate, startAge, endAge, gender) {
    try {
      let deceasedPatients
      let recoveredPatients
      if(gender){
        deceasedPatients = await Patients.aggregate([
          {
            $match: {
              status: "Deceased",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              gender: gender,
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum : 1}
            }
          }
        ]);
        recoveredPatients = await Patients.aggregate([
          {
            $match: {
              status: "Recovered",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
              gender: gender
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum : 1}
            }
          }
        ]);
      } else {
        deceasedPatients = await Patients.aggregate([
          {
            $match: {
              status: "Deceased",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              }
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum: 1}
            }
          }
        ]);
        recoveredPatients = await Patients.aggregate([
          {
            $match: {
              status: "Recovered",
              reportedOn: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              },
              ageEstimate: {
                $gte: startAge,
                $lte: endAge
              },
            },
          },
          {
            $group: {
              _id: "$reportedOn",
              // res: {
              //   $push: "$$ROOT"
              // },
              count: {$sum: 1}
            }
          }
        ]);
      }
      return {
        error: false,
        message: 'Details have been fetched',
        code: 200,
        deceasedPatients: deceasedPatients,
        recoveredPatients: recoveredPatients
      };
    } catch (err) {
      logger.error('An Error Occurred: ' + err);
      return {
        error: true,
        message: 'An error occurred: ' + err,
        code: 500
      };
    }
  }

  static async fetchAll(startDate, endDate, startAge, endAge, gender, state, status) {
    try {
      const patients = [
        {
          $match: {
            status: status,
          },
        },
        {
          $group: {
            _id: "$reportedOn",
            count: {$sum : 1}
          }
        }
      ]
      if(startDate) {
        if(!patients[0].$match.reportedOn){
          patients[0].$match.reportedOn = {}
        }
        patients[0].$match.reportedOn.$gte = new Date(startDate);
      }
      if(endDate) {
        if(!patients[0].$match.reportedOn){
          patients[0].$match.reportedOn = {}
        }
        patients[0].$match.reportedOn.$lte = new Date(endDate);
      }
      if(startAge) {
        if(!patients[0].$match.ageEstimate){
          patients[0].$match.ageEstimate = {}
        }
        patients[0].$match.ageEstimate.$gte = parseInt(startAge);
      }
      if(endAge) {
        if(!patients[0].$match.ageEstimate){
          patients[0].$match.ageEstimate = {}
        }
        patients[0].$match.ageEstimate.$lte = parseInt(endAge);
      }
      if(gender) {
        patients[0].$match.gender = gender;
      }
      if(state) {
        patients[0].$match.state = state;
      }
      const res = await Patients.aggregate(patients);
      return {
        error: false,
        message: 'Details have been fetched',
        code: 200,
        patients: res
      };
    } catch (err) {
      logger.error('An Error Occurred: ' + err);
      return {
        error: true,
        message: 'An error occurred: ' + err,
        code: 500
      };
    }
  }

  static async sendEmail(file,email) {
    try {
      const msg = {
        to: email,
        from: 'hishaamakhtar2001.mha@gmail.com',
        subject: 'Analytics',
        text: 'Please find the attachment below',
        attachments: [
          {
            content: file,
            filename: "attachment.png",
            type: "application/png",
            disposition: "attachment"
          }
        ]
      };
      await sgMail.send(msg);
      return {
        error: false,
        message: 'Email Sent',
        code: 200
      };
    } catch(err){
      logger.error('An Error Occurred: ' + err);
      return {
        error: true,
        message: 'An error occurred: ' + err,
        code: 500
      };
    }
  }
}

module.exports = PatientController;
