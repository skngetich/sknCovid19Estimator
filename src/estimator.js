const covid19ImpactEstimator = (data) =>{
    
    let {region,periodType,reportedCases,population,totalHospitalBeds}= data
    
return {
  data,
  impact:{
      currentlyinfected
  },
  severeImpact
}};

export default covid19ImpactEstimator;
