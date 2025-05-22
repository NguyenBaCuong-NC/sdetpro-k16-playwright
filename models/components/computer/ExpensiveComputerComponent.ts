import { selector } from "../../SelectorDecorator";
import { ComputerEssentialComponent } from "./ComputerEssentialComponent";

@selector(".product-essential")
export default class StandardComputerComponent extends ComputerEssentialComponent {
    public selectRAM(value: string) {
        console.log("123");
    }
}