import { NumberInput } from "@angular/cdk/coercion";

export interface ParvandehModel {
    Id?: number;
    ShomarehParvandehDarVahedHoghooghi?: number;
    ShomarehRadifParvandehDarVahedHoghooghi?: string;
    TashkilParvandehDarVahedHoghooghiDate?: Date;
    EdarehDaaviMalekParvandehAstId?: number;
    MalekParvandehZoneId?: number;
    ParvandehName?: string;
    ParvandehLahYaAlayhMoasesehNoorId?: number;
    ManshaParvandehTypeId?: number;
    TashilatiYaGheyrTashilatiId?: number;
    TashkilParvandehTashilatiDate?: Date;
    Tozihat?: string;
    ZoneName?: any;
    ZoneId?: any;
    ZoneCode?: any;
}