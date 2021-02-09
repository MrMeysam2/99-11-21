export interface ChangeTableHaghighi {
    Id?: number;
    Username?: string;
    PersonnelCode?: string;
    FirstName?: string;
    LastName?: string;
    NationalCode?: string;
    RecordChangeDateTime?: Date;
    RecordChangeUserId?: number;
    ChangeTableTypeId?: number;
    ChangeRecordId?: number;
    MeghdarRecordBeforeChange?: string;
    MeghdarRecordAfterChange?: string;
    CreationUserId?: number;
    CreationDate?: Date;
    LastModifyUserId?: number;
    LastModifyDate?: Date;


    NationalCodeSplitBefore?: any;
    FirstNameSplitBefore?: any;
    FamilyNameSplitBefore?: any;
    BirthDateSplitBefore?: any;
    BirthDateShamsSplitBefore?: any;
    FatherNameSplitBefore?: any;
    ShomarehShenasnamehSplitBefore?: any;
    ProvinceIdSplitBefore?: any;
    ProvinceNameSplitBefore?: string;
    MahalSodoorShenasnamehIdSplitBefore?: any;
    CityNameSplitBefore?: string;
    SeriShenasnamehSplitBefore?: any;
    SerialShenasnamehSplitBefore?: any;
    ShomarehMobileSplitBefore?: any;



    NationalCodeSplitAfter?: any;
    FirstNameSplitAfter?: any;
    FamilyNameSplitAfter?: any;
    BirthDateSplitAfter?: any;
    BirthDateShamsSplitAfter?: any;
    FatherNameSplitAfter?: any;
    ShomarehShenasnamehSplitAfter?: any;
    ProvinceIdSplitAfter?: any;
    ProvinceNameSplitAfter?: string;
    MahalSodoorShenasnamehIdSplitAfter?: any;
    CityNameSplitAfter?: string;
    SeriShenasnamehSplitAfter?: any;
    SerialShenasnamehSplitAfter?: any;
    ShomarehMobileSplitAfter?: any;

}