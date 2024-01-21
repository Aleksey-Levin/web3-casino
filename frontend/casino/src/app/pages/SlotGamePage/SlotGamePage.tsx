import ContainerLayout from "../../utils/ContainerLayout";
import SlotMachine from "../../components/App/SlotMachine/SlotMachine";


export const SlotGamePage = () => {
    return (
        <ContainerLayout className="md:min-h-[500px]">
            <SlotMachine />
        </ContainerLayout>
    );
};