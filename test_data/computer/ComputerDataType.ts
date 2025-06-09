import { ComputerEssentialComponent } from "../../models/components/computer/ComputerEssentialComponent";
import { ComputerComponentConstructor } from "../../models/pages/ComputerDetailsPage";

export interface ComputerDataType {
    loginCreds?: { username: string, password: string },
    computerCompClass: ComputerComponentConstructor<ComputerEssentialComponent>,
    processor?: string,
    ram?: string,
    hdd?: string,
    os?: string,
    software?: string,
    quantity?: number,
}