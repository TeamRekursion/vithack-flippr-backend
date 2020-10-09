const Patients = require('../models/patients');
const logger = require('../logging/logger');

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
}

module.exports = PatientController;
