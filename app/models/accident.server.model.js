
var boolSetter = function(bool) {return (bool==='YES' || bool==='UNKNOWN');};
var numSetter = function(num) {return (num) ? parseInt(num) : 0;};
var numParser = function(num) {return num.replace(/[-\s\.\/\(\)]/g, '');};

var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccidentSchema = new Schema({
    REPORT_RECEIVED_DATE: Date,
    IYEAR: Number,
    REPORT_NUMBER: Number,
    SUPPLEMENTAL_NUMBER: Number,
    REPORT_TYPE: String,
    OPERATOR_ID: Number,
    NAME: String,
    OPERATOR_STREET_ADDRESS: String,
    OPERATOR_CITY_NAME: String,
    OPERATOR_STATE_ABBREVIATION: String,
    OPERATOR_POSTAL_CODE: {
        type: Number,
        set: numParser
    },
    LOCAL_DATETIME: String,                 // PARSE THIS
    LOCATION_STREET_ADDRESS: String,
    LOCATION_CITY_NAME: String,
    LOCATION_COUNTY_NAME: String,
    LOCATION_STATE_ABBREVIATION: String,
    LOCATION_POSTAL_CODE: String,           // PARSE THIS
    LOCATION_LATITUDE: Number,              // PROBABLY PARSE THIS
    LOCATION_LONGITUDE: Number,             // PROBABLY PARSE THIS
    NRC_RPT_NUM: String,                    // GET A BETTER VALIDATOR
    NRC_RPT_DATETIME: String,               // PARSE THIS
    INCIDENT_RESULTED: String,
    COMMODITY_RELEASED_TYPE: String,
    COMMODITY_DETAILS: String,
    GAS_RELEASED: String,                   // NUMBER??
    FATALITY_IND: {
        type: Boolean,
        set: boolSetter 
    },
    NUM_EMP_FATALITIES: {
        type: Number,
        set: numSetter
    },
    NUM_CONTR_INJURIES: {
        type: Number,
        set: numSetter
    },
    NUM_ER_FATALITIES: {
        type: Number,
        set: numSetter
    },
    NUM_WORKER_FATALITIES: {
        type: Number,
        set: numSetter
    },
    NUM_GP_FATALITIES: {
        type: Number,
        set: numSetter
    },
    FATAL: Number,
    INJURY_IND: {
        type: Boolean,
        set: boolSetter
    },
    NUM_EMP_INJURIES: {
        type: Number,
        set: numSetter
    },
    NUM_CONTR_INJURIES: {
        type: Number,
        set: numSetter
    },
    NUM_ER_INJURIES: {
        type: Number,
        set: numSetter
    },
    NUM_WORKER_INJURIES: {
        type: Number,
        set: numSetter
    },
    NUM_GP_INJURIES: {
        type: Number,
        set: numSetter
    },
    INJURE: Number,
    SHUTDOWN_DUE_ACCIDENT_IND: {
        type: Boolean,
        set: boolSetter
    },
    SHUTDOWN_EXPLAIN: String,
    SHUTDOWN_DATETIME: String,              // PARSE THIS
    RESTART_DATETIME: String,               // PARSE THIS
    STILL_SHUTDOWN_IND: {
        type: Boolean,
        set: boolSetter
    },
    IGNITE_IND: {
        type: Boolean,
        set: boolSetter
    },
    EXPLODE_IND: {
        type: Boolean,
        set: boolSetter
    },
    NUM_PUB_EVACUATED: Number,
    INCIDENT_IDENTIFIED_DATETIME: String,   // PARSE THIS
    ON_SITE_DATETIME: String,               // PARSE THIS
    FEDERAL: {
        type: Boolean,
        set: boolSetter
    },
    LOCATION_TYPE: String,
    INCIDENT_AREA_TYPE: String,
    INCIDENT_AREA_SUBTYPE: String,
    INCIDENT_AREA_DETAILS: String,
    DEPTH_OF_COVER: String,                 // PROBABLY PARSE THIS
    CROSSING: {
        type: Boolean,
        set: boolSetter
    },
    BRIDGE_CROSSING_IND: {
        type: Boolean,
        set: boolSetter
    },
    BRIDGE_TYPE: String,
    RAILROAD_CROSSING_IND: {
        type: Boolean,
        set: boolSetter
    },
    RAILROAD_TYPE: String,
    ROAD_CROSSING_IND: {
        type: Boolean,
        set: boolSetter
    },
    ROAD_TYPE: String,
    WATER_CROSSING_IND: {
        type: Boolean,
        set: boolSetter
    },
    WATER_TYPE: String,
    WATER_NAME: String,
    WATER_DEPTH: String,
    PIPE_FACILITY_TYPE: String,
    PIPE_TYPE_OTHER: String,
    SYSTEM_PART_INVOLVED: String,
    SYSTEM_PART_DETAILS: String,                // PARSE THIS ?
    INSTALLATION_YEAR_UNKNOWN_IND: {
        type: Boolean,
        set: boolSetter
    },
    INSTALLATION_YEAR: Number,
    PIPE_DIAMETER: Number,
    PIPE_SPECIFICATION: String,
    PIPE_MFRR_UNKNOWN_IND: {
        type: Boolean,
        set: boolSetter
    },
    PIPE_MANUFACTURER: String,
    PIPE_MFR_YEAR_UNKNOWN_IND: {
        type: Boolean,
        set: boolSetter
    },
    PIPE_MANUFACTURE_YEAR: Number,
    MATERIAL_INVOLVED: String,
    MATERIAL_DETAILS: String,
    SEAM_TYPE_UNKNOWN_IND: {
        type: Boolean,
        set: boolSetter
    },
    MATERIAL_SEAM_TYPE: String,
    WT_STEEL: String,
    WT_STEEL_UNKNOWN_IND: {
        type: Boolean,
        set: boolSetter
    },
    PLASTIC_TYPE: String,
    PLASTIC_DETAILS: String,
    PLASTIC_SDR: String,
    WT_PLASTIC: String,
    WT_PLASTIC_UNKNOWN_IND: {
        type: Boolean,
        set: boolSetter
    },
    MATERIAL_PE_PIPE_CODE: String,
    PLASTIC_PE_UNKNOWN_IND: {
        type: Boolean,
        set: boolSetter
    },
    RELEASE_TYPE: String,
    PUNCTURE_AXIAL: Number,
    PUNCTURE_CIRCUM: Number,
    LEAK_TYPE: String,
    LEAK_TYPE_OTHER: String,
    RUPTURE_ORIENT: String,
    RUPTURE_DETAILS: String,
    RUPTURE_LENGTH: Number,
    RUPTURE_WIDTH: Number,
    RELEASE_TYPE_DETAILS: String,
    CLASS_LOCATION_TYPE: String,
    EST_COST_OPER_PAID: Number,
    EST_COST_PROP_DAMAGE: Number,
    EST_COST_EMERGENCY: Number,
    EST_COST_OTHER: Number,
    EST_COST_OTHER_DETAILS: String,
    EST_COST_GAS_RELEASED: Number,
    PRPTY: Number,
    COMMERCIAL_AFFECTED: Number,
    INDUSTRIAL_AFFECTED: Number,
    RESIDENCES_AFFECTED: Number,
    ACCIDENT_PSIG: Number,
    NORMAL_PSIG: Number,
    MOP_PSIG: Number,
    ACCIDENT_PRESSURE: String,
    SCADA_IN_PLACE_IND: {
        type: Boolean,
        set: boolSetter
    },
    SCADA_OPERATING_IND: {
        type: Boolean,
        set: boolSetter
    },
    SCADA_FUNCTIONAL_IND: {
        type: Boolean,
        set: boolSetter
    },
    SCADA_DETECTION_IND: {
        type: Boolean,
        set: boolSetter
    },
    SCADA_CONF_IND: {
        type: Boolean,
        set: boolSetter
    },
    ACCIDENT_IDENTIFIER: String,
    ACCIDENT_DETAILS: String,
    OPERATOR_TYPE: String,
    INVESTIGATION_STATUS: String,
    INVESTIGATION_STATUS_DETAILS: String,
    INVEST_SCHEDULE_IND: {
        type: Boolean,
        set: boolSetter
    },
    INVEST_NO_SCHEDULE_IND: {
        type: Boolean,
        set: boolSetter
    },
    INVEST_NO_SCHEDULE_IND_DETAILS: String,
    INVEST_NO_CONTROL_ROOM_IND: String,
    INVEST_NO_CONTROLLER_IND: {
        type: Boolean,
        set: boolSetter
    },
    INVEST_INCORRECT_ACTION_IND: {
        type: Boolean,
        set: boolSetter
    },
    INVEST_FATIGUE_IND: {
        type: Boolean,
        set: boolSetter
    },
    
    INVEST_INCORRECT_PROCEDURE_IND: {
        type: Boolean,
        set: boolSetter
    },
    INVEST_INCORRECT_CONTROL_IND: {
        type: Boolean,
        set: boolSetter
    }, 
    INVEST_MAINT_IND: {
        type: Boolean,
        set: boolSetter
    },
    INVEST_OTHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    INVEST_OTHER_IND_DETAILS: String,
    EMPLOYEE_DRUG_TEST_IND: {
        type: Boolean,
        set: boolSetter
    },
    NUM_EMPLOYEES_TESTED: Number,
    NUM_EMPLOYEES_FAILED: Number,
    CONTRACTOR_DRUG_TEST_IND: { 
        type: Boolean, 
        set: boolSetter 
    },
    NUM_CONTRACTORS_TESTED: Number,
    NUM_CONTRACTORS_FAILED: Number,
    CAUSE: String,
    CAUSE_DETAILS: String,
    INTERNAL_EXTERNAL: String,
    VISUAL_EXAM_RESULTS: String,
    VISUAL_EXAM_DETAILS: String,
    GALVANIC_CORROSION_IND: { 
        type: Boolean,
        set: boolSetter
    },
    ATMOSPHERE_CORROSION_IND: {
        type: Boolean,
        set: boolSetter
    },
    STRAY_CURRENT_CORROSION_IND: {
        type: Boolean,
        set: boolSetter
    },
    MICROBIOLOGICAL_CORROSION_IND: {
        type: Boolean,
        set: boolSetter
    },
    SELECTIVE_SEAM_CORROSION_IND: {
        type: Boolean,
        set: boolSetter
    },
    OTHER_CORROSION_IND: {
        type: Boolean,
        set: boolSetter
    },
    CORROSION_TYPE_DETAILS: String,
    FIELD_EXAM_BASIS_IND: {
        type: Boolean,
        set: boolSetter
    },
    METALLURGICAL_BASIS_IND: {
        type: Boolean,
        set: boolSetter
    },
    OTHER_BASIS_IND: {
        type: Boolean,
        set: boolSetter
    },
    CORROSION_BASIS_DETAILS: String,
    UNDERGROUND_LOCATION: {
        type: Boolean,
        set: boolSetter
    },
    UNDER_CATHODIC_PROTECTION_IND: {
        type: Boolean,
        set: boolSetter
    },
    CATHODIC_PRO_START_YEAR: Number,
    SHIELDING_EVIDENT: {
        type: Boolean,
        set: boolSetter
    },
    CATHODIC_SURVEY_TYPE: {
        type: Boolean,
        set: boolSetter
    },
    CP_ANNUAL_SURVEY_IND: {
        type: Boolean,
        set: boolSetter
    },
    CLOSE_INTERVAL_SURVEY_IND: {
        type: Boolean,
        set: boolSetter
    },
    OTHER_CP_SURVEY_IND: {
        type: Boolean,
        set: boolSetter
    },
    CP_ANNUAL_SURVEY_YEAR: Number,
    CLOSE_INTERVAL_SURVEY_YEAR: Number,
    OTHER_CP_SURVEY_YEAR: Number,
    EXTERNALLY_COATED: {
        type: Boolean,
        set: boolSetter
    },
    PRIOR_DAMAGE: {
        type: Boolean,
        set: boolSetter
    },
    COATING_TYPE: String,
    COATING_TYPE_DETAILS: String,
    INT_VISUAL_EXAM_RESULTS: String,
    INT_VISUAL_EXAM_DETAILS: String,
    INT_CORROSIVE_COMMODITY_IND: {
        type: Boolean,
        set: boolSetter
    },
    INT_WATER_ACID_IND: {
        type: Boolean,
        set: boolSetter
    },
    INT_MICROBIOLOGICAL_IND: {
        type: Boolean,
        set: boolSetter
    },
    INT_EROSION_IND: {
        type: Boolean,
        set: boolSetter
    },
    INT_OTHER_CORROSION_IND: {
        type: Boolean,
        set: boolSetter
    },
    INT_CORROSION_TYPE_DETAILS: String,
    INT_FIELD_EXAM_BASIS_IND: {
        type: Boolean,
        set: boolSetter
    },
    INT_METALLURGICAL_BASIS_IND: {
        type: Boolean,
        set: boolSetter
    },
    INT_OTHER_BASIS_IND: {
        type: Boolean,
        set: boolSetter
    },
    INT_CORROSION_BASIS_DETAILS: String,
    INT_LOW_POINT_PIPE_LOC_IND: {
        type: Boolean,
        set: boolSetter
    },
    INT_ELBOW_LOC_IND: {
        type: Boolean,
        set: boolSetter
    },
    INT_DROP_OUT_LOC_IND: {
        type: Boolean,
        set: boolSetter
    },
    INT_OTHER_LOC_IND: {
        type: Boolean,
        set: boolSetter
    },
    CORROSION_LOCATION_DETAILS: String,
    CORROSION_INHIBITORS: {
        type: Boolean,
        set: boolSetter
    },
    LIQUID_FOUND: {
        type: Boolean,
        set: boolSetter
    },
    COR_HYDROTEST_LEAK_SURVEY_DATE: Date,           // GET A BETTER VALIDATOR
    COR_HYDROTEST_CONDUCTED_IND: {
        type: Boolean,
        set: boolSetter
    },
    COR_HYDROTEST_CONDUCTED_YEAR: Number,
    COR_HYDROTEST_PRESSURE: String,
    NATURAL_FORCE_TYPE: String,
    EARTH_SUBTYPE: String,
    HEAVY_RAINS_SUBTYPE: String,
    LIGHTNING_SUBTYPE: String,
    TEMPERATURE_SUBTYPE: String,
    NF_OTHER_DETAILS: String,
    NF_EXTREME_WEATHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    NF_HURRICANE_IND: {
        type: Boolean,
        set: boolSetter
    },
    NF_TROPICAL_STORM_IND: {
        type: Boolean,
        set: boolSetter
    },
    NF_TORNADO_IND: {
        type: Boolean,
        set: boolSetter
    },
    NF_OTHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    NF_EXTREME_WEATHER_DETAILS: String,
    EX_PARTY_TYPE: String,
    EX_HYDROTEST_LEAK_SURVEY_DATE: String,            // GET A BETTER VALIDATOR
    EX_HYDROTEST_CONDUCTED_IND: {
        type: Boolean,
        set: boolSetter
    },
    EX_HYDROTEST_CONDUCTED_YEAR: Number,
    EX_HYDROTEST_PRESSURE: Number,
    PRIOR_NOTIFICATION_IND: {
        type: Boolean,
        set: boolSetter
    },
    ONE_CALL_SYSTEM_IND: {
        type: Boolean,
        set: boolSetter
    },
    EXCAVATOR_IND: {
        type: Boolean,
        set: boolSetter
    },
    CONTRACTOR_IND: {
        type: Boolean,
        set: boolSetter
    },
    LANDOWNER_IND: {
        type: Boolean,
        set: boolSetter
    },
    NOTIFY_CGA_DIRT: {
        type: Boolean,
        set: boolSetter
    },
    PUBLIC_ROW_IND: {
        type: Boolean,
        set: boolSetter
    },
    PUBLIC_SUBTYPE: String,
    PRIVATE_ROW_IND: {
        type: Boolean,
        set: boolSetter
    },
    PRIVATE_SUBTYPE: String,
    PIPELINE_EASEMENT_ROW_IND: {
        type: Boolean,
        set: boolSetter
    },
    POWER_TRANSMISSION_ROW_IND: {
        type: Boolean,
        set: boolSetter
    },
    RAILROAD_ROW_IND: {
        type: Boolean,
        set: boolSetter
    },
    PUBLIC_UTIL_EASEMENT_ROW_IND: {
        type: Boolean,
        set: boolSetter
    },
    FEDERAL_LAND_ROW_IND: {
        type: Boolean,
        set: boolSetter
    },
    DATA_NOT_COLLECTED_ROW_IND: {
        type: Boolean,
        set: boolSetter
    },
    UNKNOWN_ROW_IND: {
        type: Boolean,
        set: boolSetter
    },
    EXCAVATOR_TYPE: String,
    EXCAVATOR_EQUIPMENT: String,
    WORK_PERFORMED: String,
    ONE_CALL_NOTIFIED_IND: {
        type: Boolean,
        set: boolSetter
    },
    ONE_CALL_TICKET_NUM: Number,
    ONE_CALL_CENTER_NAME: String,
    LOCATOR_TYPE: String,
    VISIBLE_MARKS: {
        type: Boolean,
        set: boolSetter
    },
    FACILITIES_MARKED: {
        type: Boolean,
        set: boolSetter
    },
    SERVICE_INTERRUPTION: {
        type: Boolean,
        set: boolSetter
    },
    SERVICE_INTERRUPTION_HOURS: Number,
    ROOT_CAUSE: String,
    ROOT_CAUSE_OTHER: String,
    ONE_CALL_SUBTYPE: String,
    LOCATING_SUBTYPE: String,
    EXCAVATION_SUBTYPE: String,
    OUTSIDE_FORCE_TYPE: String,
    VEHICLE_SUBTYPE: String,
    OSF_HURRICANE_IND: {
        type: Boolean,
        set: boolSetter
    },
    OSF_TROPICAL_STORM_IND: {
        type: Boolean,
        set: boolSetter
    },
    OSF_TORNADO_IND: {
        type: Boolean,
        set: boolSetter
    },
    OSF_HEAVY_RAINS_IND: {
        type: Boolean,
        set: boolSetter
    },
    OSF_OTHER_WEATHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    OSF_OTHER_WEATHER_DETAILS: String,
    OSF_HYDROTEST_LEAK_SURVEY_DATE: Date,               // PARSE THIS
    OSF_HYDROTEST_CONDUCTED_IND: {
        type: Boolean,
        set: boolSetter
    },
    OSF_HYDROTEST_CONDUCTED_YEAR: Number,
    OSF_HYDROTEST_PRESSURE: String,
    INTENTIONAL_SUBTYPE: String,
    INTENTIONAL_DETAILS: String,
    OSF_OTHER_DETAILS: String,
    PWJF_FAILURE_TYPE: String,
    PIPE_BODY_SUBTYPE: String,
    PIPE_BODY_DETAILS: String,
    BUTT_WELD_SUBTYPE: String,
    BUTT_WELD_DETAILS: String,
    FILLET_WELD_SUBTYPE: String,
    FILLET_WELD_DETAILS: String,
    PIPE_SEAM_SUBTYPE: String,
    PIPE_SEAM_DETAILS: String,
    MECHANICAL_FITTING_INVOLVED: String,
    MEC_FITTING_OTHER: String,
    MECHANICAL_FITTING_TYPE: String,
    MEC_FITTING_TYPE_OTHER: String,
    MPW_MANUFACTURER: String,
    MPW_MANUFACTURE_YEAR: String,                   // GET A BETTER VALIDATOR
    MPW_INSTALLED_YEAR: Number,
    MPW_OTHER_ATTR: String,
    MPW_FIRST_MAT_JOINED_STEEL: {
        type: Boolean,
        set: boolSetter
    },
    MPW_FIRST_MAT_JOINED_CAST: {
        type: Boolean,
        set: boolSetter
    },
    MPW_FIRST_MAT_JOINED_IRON: {
        type: Boolean,
        set: boolSetter
    },
    MPW_FIRST_MAT_JOINED_COPPER: {
        type: Boolean,
        set: boolSetter
    },
    MPW_FIRST_MAT_JOINED_PLASTIC: {
        type: Boolean,
        set: boolSetter
    },
    MPW_FIRST_MAT_JOINED_UNKNOWN: {
        type: Boolean,
        set: boolSetter
    },
    MPW_FIRST_MAT_JOINED_OTHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    MPW_FIRST_MAT_JOINED_OTHER: String,
    MPW_FIRST_PLASTIC_TYPE: String,
    MPW_FIRST_PLASTIC_TYPE_OTHER: String,
    MPW_SECOND_MAT_JOINED_STEEL: {
        type: Boolean,
        set: boolSetter
    },
    MPW_SECOND_MAT_JOINED_CAST: {
        type: Boolean,
        set: boolSetter
    },
    MPW_SECOND_MAT_JOINED_IRON: {
        type: Boolean,
        set: boolSetter
    },
    MPW_SECOND_MAT_JOINED_COPPER: {
        type: Boolean,
        set: boolSetter
    },
    MPW_SECOND_MAT_JOINED_PLASTIC: {
        type: Boolean,
        set: boolSetter
    },
    MPW_SECOND_MAT_JOINED_UNKNOWN: {
        type: Boolean,
        set: boolSetter
    },
    MPW_SEC_MAT_JOINED_OTHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    MPW_SECOND_MAT_JOINED_OTHER: String,
    MPW_SECOND_PLASTIC_TYPE: String,
    MPW_SECOND_PLASTIC_TYPE_OTHER: String,
    INCLUDE_RESTRAINT_IND: {
        type: Boolean,
        set: boolSetter
    },
    INCLUDE_RESTRAINT: String,
    CPW_FITTING_TYPE: String,
    CPW_MANUFACTURER: String,
    CPW_MANUFACTURE_YEAR: String,                   // GET A BETTER VALIDATOR
    CPW_INSTALLED_YEAR: String,                     // GET A BETTER VALIDATOR
    CPW_OTHER_ATTR: String,
    CPW_FIRST_MAT_JOINED_STEEL: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_CAST: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_IRON: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_COPPER: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_PLASTIC: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_UNKNOWN: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_OTHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_OTHER: String,
    CPW_FIRST_PLASTIC_TYPE: String,
    CPW_FIRST_PLASTIC_TYPE_OTHER: String,
    CPW_SECOND_MAT_JOINED_STEEL: {
        type: Boolean,
        set: boolSetter
    },
    CPW_SECOND_MAT_JOINED_CAST: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_IRON: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_COPPER: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_PLASTIC: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_UNKNOWN: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_OTHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    CPW_FIRST_MAT_JOINED_OTHER: String, 
    CPW_FIRST_PLASTIC_TYPE: String,
    CPW_FIRST_PLASTIC_TYPE_OTHER: String,
    CPW_SECOND_MAT_JOINED_STEEL: {
        type: Boolean,
        set: boolSetter
    },
    CPW_SECOND_MAT_JOINED_CAST: {
        type: Boolean,
        set: boolSetter
    },
    CPW_SECOND_MAT_JOINED_IRON: {
        type: Boolean,
        set: boolSetter
    },
    CPW_SECOND_MAT_JOINED_COPPER: {
        type: Boolean,
        set: boolSetter
    },
    CPW_SECOND_MAT_JOINED_PLASTIC: {
        type: Boolean,
        set: boolSetter
    },
    CPW_SECOND_MAT_JOINED_UNKNOWN: {
        type: Boolean,
        set: boolSetter
    },
    CPW_SEC_MAT_JOINED_OTHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    CPW_SECOND_MAT_JOINED_OTHER: String,
    CPW_SECOND_PLASTIC_TYPE: String,
    CPW_SECOND_PLASTIC_TYPE_OTHER: String,
    PLASTIC_JOINT_SUBTYPE: String,
    PLASTIC_JOINT_DETAILS: String,
    FPW_INSTALLED_YEAR: Number,
    FPW_OTHER_ATTR: String,
    FPW_FIRST_PLASTIC_TYPE: String,
    FPW_FIRST_PLASTIC_TYPE_OTHER: String,
    FPW_SECOND_PLASTIC_TYPE: String,
    FPW_SECOND_PLASTIC_TYPE_OTHER: String,
    PWJF_FAILURE_DETAILS: String,
    ADDITIONAL_DENT_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_GOUGE_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_PIPE_BEND_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_ARC_BURN_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_CRACK_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_LACK_FUSION_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_LAMINATION_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_BUCKLE_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_WRINKLE_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_MISALIGNMENT_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_BURNT_STEEL_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_OTHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    ADDITIONAL_OTHER_DETAILS: String,
    ADDITIONAL_FACTOR_DETAILS: String,
    RESULT_CONSTRUCTION_IND: {
        type: Boolean,
        set: boolSetter
    },
    RESULT_MATERIAL_IND: {
        type: Boolean,
        set: boolSetter
    },
    RESULT_DESIGN_IND: {
        type: Boolean,
        set: boolSetter
    },
    RESULT_PREVIOUS_IND: {
        type: Boolean,
        set: boolSetter
    },
    RESULT_CONSTRUCTION_SUBTYPE: String,
    RESULT_MATERIAL_SUBTYPE: String,
    RESULT_MATERIAL_DETAILS: String,
    HYDROTEST_CONDUCTED_IND: {
        type: Boolean,
        set: boolSetter
    },
    HYDROTEST_CONDUCTED_YEAR: String,               // GET A BETTER VALIDATOR
    HYDROTEST_PRESSURE: String,                     // GET A BETTER VALIDATOR
    EQ_FAILURE_TYPE: String,
    CONTROL_VALVE_IND: {
        type: Boolean,
        set: boolSetter
    },
    INSTRUMENTATION_IND: {
        type: Boolean,
        set: boolSetter
    },
    SCADA_IND: {
        type: Boolean,
        set: boolSetter
    },
    COMMUNICATIONS_IND: {
        type: Boolean,
        set: boolSetter
    },
    BLOCK_VALVE_IND: {
        type: Boolean,
        set: boolSetter
    },
    CHECK_VALVE_IND: {
        type: Boolean,
        set: boolSetter
    },
    RELIEF_VALVE_IND: {
        type: Boolean,
        set: boolSetter
    },
    POWER_FAILURE_IND: {
        type: Boolean,
        set: boolSetter
    },
    STOPPLE_CONTROL_FITTING_IND: {
        type: Boolean,
        set: boolSetter
    },
    PRESSURE_REGULATOR_IND: {
        type: Boolean,
        set: boolSetter
    },
    OTHER_CONTROL_RELIEF_IND: {
        type: Boolean,
        set: boolSetter
    },
    OTHER_CONTROL_RELIEF_DETAILS: String,
    OTHER_STRIPPED_IND: {
        type: Boolean,
        set: boolSetter
    },
    OTHER_STRIPPED_DETAILS: String,
    OTHER_NON_THREADED_IND: {
        type: Boolean,
        set: boolSetter
    },
    OTHER_NON_THREADED_DETAILS: String,
    VALVE_OTHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    VALVE_OTHER_DETAILS: String,
    VALVE_TYPE: String,
    EQ_MANUFACTURER: String,
    EQ_MANUFACTURE_YEAR: Number,
    EQ_FAILURE_DETAILS: String,
    OPERATION_TYPE: String,
    OPERATION_DETAILS: String,
    RELATED_INADEQUATE_PROC_IND: {
        type: Boolean,
        set: boolSetter
    },
    RELATED_NO_PROC_IND: {
        type: Boolean,
        set: boolSetter
    },
    RELATED_FAILURE_FOLLOW_IND: {
        type: Boolean,
        set: boolSetter
    },
    RELATED_OTHER_IND: {
        type: Boolean,
        set: boolSetter
    },
    OPERATION_RELATED_DETAILS: String,
    CATEGORY_TYPE: String,
    OPERATOR_QUALIFICATION_IND: {
        type: Boolean,
        set: boolSetter
    },
    QUALIFIED_INDIVIDUALS: String,
    OTHER_TYPE: String,
    MISC_DETAILS: String,
    UNKNOWN_SUBTYPE: String,
    PREPARER_NAME: String,
    PREPARER_TITLE: String,
    PREPARER_EMAIL: {
        type: String,
        match: /.+\@.+\..+/
    },
    PREPARER_TELEPHONE: {
        type: Number,
        set: numParser
    },
    PREPARER_FAX: {
        type: Number,
        set: numParser
    },
    PREPARED_DATE: Date,                            // PARSE THIS
    AUTHORIZER_NAME: String,
    AUTHORIZER_TITLE: String,
    AUTHORIZER_TELEPHONE: String,
    AUTHORIZER_EMAIL: {
        type: String,
        // match: /.+\@.+\..+/,                     // GET A BETTER VALIDATOR
        required: false
    },
    NARRATIVE: String
});

mongoose.model('Accident', AccidentSchema);




