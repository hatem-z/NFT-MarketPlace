import * as React from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";

export default function MyKeyboard() {
    const [firstNumber, setFirstNumber] = React.useState("");
    const [secondNumber, setSecondNumber] = React.useState("");
    const [operation, setOperation] = React.useState("");
    const [result, setResult] = React.useState<Number | null>(null);
    const [isResultUsed, setIsResultUsed] = React.useState(false);

    const handleNumberPress = (buttonValue: string) => {
        if (isResultUsed) {
            setFirstNumber(buttonValue);
            setResult(null); 
            setIsResultUsed(false);
            setSecondNumber("");
        } else if (firstNumber.length < 10) {
            setFirstNumber(firstNumber + buttonValue);
        }
    };

    const handleOperationPress = (buttonValue: string) => {
        if (result !== null) {
            setSecondNumber(result.toString());
            setFirstNumber("");
            setResult(null);
        } else {
            setSecondNumber(firstNumber);
            setFirstNumber("");
        }
        setOperation(buttonValue);
        setIsResultUsed(false);
    };

    const clear = () => {
        setFirstNumber("");
        setSecondNumber("");
        setOperation("");
        setResult(null);
        setIsResultUsed(false);
    };

    const getResult = () => {
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(secondNumber);

        if (isNaN(num1) || isNaN(num2)) {
            clear();
            setResult(null);
            return;
        }
        
        let resultValue;
        switch (operation) {
            case "+":
                resultValue = num2 + num1;
                break;
            case "-":
                resultValue = num2 - num1;
                break;
            case "*":
                resultValue = num2 * num1;
                break;
            case "/":
                if (num1 === 0) {
                    clear();
                    setResult(null); // رسالة خطأ لقسمة على الصفر
                    return;
                }
                resultValue = num2 / num1;
                break;
            default:
                resultValue = 0;
                break;
        }

        setResult(resultValue);
        setIsResultUsed(true); // استخدم النتيجة في العملية التالية
    };

    const firstNumberDisplay = () => {
        if (result !== null) {
            return (
                <Text 
                    style={result < 99999 
                        ? [Styles.screenFirstNumber, { color: myColors.result }] 
                        : [Styles.screenFirstNumber, { fontSize: 50, color: myColors.result }]}
                >
                    {result?.toString()}
                </Text>
            );
        }
        if (firstNumber && firstNumber.length < 6) {
            return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>;
        }
        if (firstNumber === "") {
            return <Text style={Styles.screenFirstNumber}>{"0"}</Text>;
        }
        if (firstNumber.length > 5 && firstNumber.length < 8) {
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: 70 }]}>
                    {firstNumber}
                </Text>
            );
        }
        if (firstNumber.length > 7) {
            return (
                <Text style={[Styles.screenFirstNumber, { fontSize: 50 }]}>
                    {firstNumber}
                </Text>
            );
        }
    };

    return (
        <View style={Styles.viewBottom}>
            <View
                style={{
                    height: 120,
                    width: "90%",
                    justifyContent: "flex-end",
                    alignSelf: "center",
                }}
            >
                <Text style={Styles.screenSecondNumber}>
                    {secondNumber}
                    <Text style={{ color: "#4B5EFC", fontSize: 50, fontWeight: '500' }}>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View>
            <View style={Styles.row}>
                <Button title="C" isGray onPress={clear} />
                <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
                <Button title="％" isGray onPress={() => handleOperationPress("％")} />
                <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
            </View>
            <View style={Styles.row}>
                <Button title="7" onPress={() => handleNumberPress("7")} />
                <Button title="8" onPress={() => handleNumberPress("8")} />
                <Button title="9" onPress={() => handleNumberPress("9")} />
                <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
            </View>
            <View style={Styles.row}>
                <Button title="4" onPress={() => handleNumberPress("4")} />
                <Button title="5" onPress={() => handleNumberPress("5")} />
                <Button title="6" onPress={() => handleNumberPress("6")} />
                <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
            </View>
            <View style={Styles.row}>
                <Button title="1" onPress={() => handleNumberPress("1")} />
                <Button title="2" onPress={() => handleNumberPress("2")} />
                <Button title="3" onPress={() => handleNumberPress("3")} />
                <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
            </View>
            <View style={Styles.row}>
                <Button title="." onPress={() => handleNumberPress(".")} />
                <Button title="0" onPress={() => handleNumberPress("0")} />
                <Button title="⌫" onPress={() => {
                    if (firstNumber) {
                        setFirstNumber(firstNumber.slice(0, -1));
                    } else if (result !== null) {
                        const resultString = result.toString();
                        const newResultString = resultString.slice(0, -1);

                        setResult(newResultString ? parseFloat(newResultString) : null);
                    }
                }} />
                <Button title="=" isBlue onPress={getResult} />
            </View>
        </View>
    );
}
