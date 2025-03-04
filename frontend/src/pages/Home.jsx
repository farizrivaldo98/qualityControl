import React, { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import axios from "axios";
import { RadialBarChart, RadialBar } from "recharts";
import {
  Spinner,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  Progress,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";
import Chart01 from "./Chart01";
import Chart02 from "./chart02";
import NVMDP from "./NVMDP";
import PDAM from "./PDAM";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CanvasJSReact from "../canvasjs.react";  
import ReactSpeedometer from "react-d3-speedometer";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Dashboard() {
  const [data, setData] = useState({});
  const userGlobal = 5;
  const socketRef = useRef(null);

  const [activeCard, setActiveCard] = useState(null); // Menyimpan card yang aktif
  const [loading, setLoading] = useState(false); // buat mengontrol spinner
  const [error, setError] = useState(null); // ini buat ngontrol pesan error

  const { isOpen, onOpen, onClose } = useDisclosure(); // Mengontrol pop-up




  const getRandomValue = () => (Math.random() * (0.90 - 0.78) + 0.78).toFixed(2);

  const [costPhi, setCostPhi] = useState(getRandomValue());

  useEffect(() => {
    const interval = setInterval(() => {
      setCostPhi(getRandomValue()); 
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  //========================================AMPERE-------------------------------------------------------------
  const generateData = () => {
    const now = new Date();
    return Array.from({ length: 20 }, (_, i) => ({
      x: i,
      label: new Date(now.getTime() - (19 - i) * 1000)
        .toISOString()
        .slice(11, 19),
      y: Math.floor(Math.random() * 10000) + 5000,
    }));
  };

  const [dailyPower, setDailyPower] = useState(generateData());
  const [counter, setCounter] = useState(20);
  const [mainAmpere, setMainAmpere] = useState();

  useEffect(() => {
    if (dailyPower.length > 0) {
      const lastYValue = dailyPower[dailyPower.length - 1].y;
      setMainAmpere(lastYValue);
    }
  }, [dailyPower]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDailyPower((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            x: counter,
            label: new Date().toISOString().slice(11, 19),
            y: Math.floor(Math.random() * 10000) + 5000,
          },
        ];
        setCounter((prevCounter) => prevCounter + 1);
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);
  const options = {
    theme: "dark1",
    
    borderRadius: 12,
    axisY: {
      prefix: "",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "spline",
        lineThickness: 5,
        name: "Ampere",
        color: "#F3E8FF",
        showInLegend: true,
        dataPoints: dailyPower,
      },
    ],
  };

  //=================================================//////////////================================================================

  const generateData1 = () => {
    const now = new Date();
    return Array.from({ length: 20 }, (_, i) => ({
      x: i,
      label: new Date(now.getTime() - (19 - i) * 1000)
        .toISOString()
        .slice(11, 19),
      y: Math.random().toFixed(2) * 0.5 + 50,
    }));
  };

  const [dailyFQ, setDailyFQ] = useState(generateData1());
  const [counter1, setCounter1] = useState(20);
  const [mainFQ, setMainFQ] = useState();

  useEffect(() => {
    if (dailyFQ.length > 0) {
      const lastYValue = dailyFQ[dailyFQ.length - 1].y;
      setMainFQ(lastYValue);
    }
  }, [dailyFQ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDailyFQ((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            x: counter1,
            label: new Date().toISOString().slice(11, 19),
            y: Math.random().toFixed(2) * 0.5 + 50,
          },
        ];
        setCounter1((prevCounter) => prevCounter + 1);
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [counter1]);
  const options1 = {
    theme: "dark1",
    borderRadius: 12,
    axisY: {
      prefix: "",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "spline",
        lineThickness: 5,
        name: "Ampere",
        color: "#DCFCE7",
        showInLegend: true,
        dataPoints: dailyFQ,
      },
    ],
  };

  //================================================VOLTAGE================================================================================================

  const generateData2 = () => {
    const now = new Date();
    return Array.from({ length: 20 }, (_, i) => ({
      x: i,
      label: new Date(now.getTime() - (19 - i) * 1000)
        .toISOString()
        .slice(11, 19),
      y: Math.random().toFixed(2) * 0.5 + 380,
    }));
  };

  const [dailyVolt, setDailyVolt] = useState(generateData1());
  const [counter2, setCounter2] = useState(20);
  const [mainVolt, setMainVolt] = useState();

  useEffect(() => {
    if (dailyVolt.length > 0) {
      const lastYValue = dailyVolt[dailyVolt.length - 1].y;
      setMainVolt(lastYValue);
    }
  }, [dailyVolt]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDailyVolt((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            x: counter2,
            label: new Date().toISOString().slice(11, 19),
            y: Math.random().toFixed(2) * 0.5 + 380,
          },
        ];
        setCounter2((prevCounter) => prevCounter + 1);
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [counter1]);
  const options2 = {
    theme: "dark1",
    borderRadius: 12,
    axisY: {
      prefix: "",
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "spline",
        lineThickness: 5,
        name: "Ampere",
        color: "#FEE2E2",
        showInLegend: true,
        dataPoints: dailyVolt,
      },
    ],
  };

  // State buat waktu inputs sampai 24 daong
  const [timeInputs, setTimeInputs] = useState({
    start1: "",
    finish1: "",
    start2: "",
    finish2: "",
  });

  // State untuk input yang uang
  const [priceInputs, setPriceInputs] = useState({
    price1: "",
    price2: "",
  });

  // SState untuk Parameter limit
  const [parameterLimits, setParameterLimits] = useState({
    gas: "",
    water: "",
    listrik: "",
  });
  const [getJam, setGetJam] = useState({});
  const [getParameter, setGetParameter] = useState({});
  const [getLimit, setGetLimit] = useState({});
  const [dataLimitOption, setDataLimitOption] = useState("");
  const [mainObject, setMainObject] = useState({});
  const [logicLimitOption, setLogicLimitOption] = useState("");

  const [dataTotalUang, setDataTotalUang] = useState();
  const [dataTotalUangAir, setDataTotalUangAir] = useState();
  const [dataTotalUangGas, setDataTotalUangGas] = useState();

  const { colorMode } = useColorMode();
  const borderColor = useColorModeValue(
    "rgba(var(--color-border))",
    "rgba(var(--color-border))"
  );
  const tulisanColor = useColorModeValue(
    "rgba(var(--color-text))",
    "rgba(var(--color-text))"
  );
  const hoverBorderColor = useColorModeValue(
    "rgba(var(--color-border2))",
    "rgba(var(--color-border2))"
  );
  const kartuColor = useColorModeValue(
    "rgba(var(--color-coba))",
    "rgba(var(--color-coba))"
  );

  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  // Label buat Parameter dan teks properti lainnya
  const parameterConfigs = [
    { key: "gas", label: "Limit Gas", unit: "mbtu" },
    { key: "water", label: "Limit Air", unit: "m³" },
    { key: "listrik", label: "Limit Listrik", unit: "kwh" },
  ];
  // Labels for the time inputs
  const timeLabels = ["Start 1", "Finish 1", "Start 2", "Finish 2"];

  useEffect(() => {
    // Buat koneksi WebSocket
    socketRef.current = new WebSocket("ws://10.126.15.137:1880/ws/test");

    socketRef.current.onopen = () => {
      //console.log("WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const message = event.data;
        const varWebSocket = JSON.parse(message);
        //console.log(varWebSocket);
        setData(varWebSocket); // Simpan seluruh objek dalam satu state
        setError(null); // Reset error
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      // console.log("WebSocket disconnected");
    };

    // Tutup koneksi WebSocket saat komponen akan di-unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []); // Kosongkan dependency array sehingga useEffect hanya berjalan sekali saat komponen di-mount

  useEffect(() => {
    if (activeCard) {
      setLoading(true);
      setError(null); // Reset error saat card baru dipilih

      // Simulasi delay untuk loading
      const timer = setTimeout(() => {
        setLoading(false);

        // Simulasi error jika diperlukan
        if (activeCard === "NVMDP" && Math.random() < 0.1) {
          setError(true);
        } else if (activeCard === "PDAM" && Math.random() < 0.1) {
          setError(true);
        } else {
          setError(null); // Reset error jika tidak ada
        }
      }, 2000); // Delay 2 detik

      return () => clearTimeout(timer); // Bersihkan timer saat component unmount
    }
  }, [activeCard]);

  const handleCardClick = (cardType) => {
    setActiveCard(cardType);
  };

  //=============================================== UANG PUNYA MAS ALDO =====================================================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://10.126.15.137:8002/part/GetJam");
        setGetJam(response.data[0]);
        let response2 = await axios.get(
          "http://10.126.15.137:8002/part/GetParameter"
        );
        setGetParameter(response2.data[0]);
        let response3 = await axios.get(
          "http://10.126.15.137:8002/part/GetLimit"
        );
        setGetLimit(response3.data[0]);

        const inputValue1 = response2.data[0].Parameter_Listrik;
        const inputValue2 = response2.data[0].Parameter_Listrik_2;
        const startHours1 = response.data[0].Jam_Listrik_1;
        const endHours1 = response.data[0].Jam_Listrik_2;
        const startHours2 = response.data[0].Jam_Listrik_3;
        const endHours2 = response.data[0].Jam_Listrik_4;

        const variableData = getTimeMoney(
          inputValue1,
          inputValue2,
          startHours1,
          endHours1,
          startHours2,
          endHours2
        );

        const variableDataAir = getTimeMoney(
          response2.data[0].Parameter_Air,
          response2.data[0].Parameter_Air_2,
          response.data[0].Jam_Air_1,
          response.data[0].Jam_Air_2,
          response.data[0].Jam_Air_3,
          response.data[0].Jam_Air_4
        );
        setDataTotalUangAir(variableDataAir);

        const variableDataGas = getTimeMoney(
          response2.data[0].Parameter_Gas,
          response2.data[0].Parameter_Gas_2,
          response.data[0].Jam_Gas_1,
          response.data[0].Jam_Gas_2,
          response.data[0].Jam_Gas_3,
          response.data[0].Jam_Gas_4
        );
        setDataTotalUangGas(variableDataGas);
        setDataTotalUang(variableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    //console.log(getJam);
    fetchData();

    const getTimeMoney = (
      value1,
      value2,
      startHour1,
      endHour1,
      startHour2,
      endHour2
    ) => {
      console.log(value1, value2, startHour1, endHour1, startHour2, endHour2);

      const now = new Date();
      const createHour = now.getHours();
      if (createHour >= startHour1 && createHour <= endHour1) {
        return value1;
      } else if (createHour >= startHour2 || createHour <= endHour2) {
        return value2;
      }
    };

    console.log(dataTotalUang);
  }, []);

  // Handle Option
  const limitOption = (e) => {
    const newObjectData1 = getJam;
    // setDataLimitOption(e.target.value);

    if (e.target.value == "option3") {
      setTimeInputs({
        start1: getJam["Jam_Listrik_1"],
        finish1: getJam["Jam_Listrik_2"],
        start2: getJam["Jam_Listrik_3"],
        finish2: getJam["Jam_Listrik_4"],
      });
      setPriceInputs({
        price1: getParameter["Parameter_Listrik"],
        price2: getParameter["Parameter_Listrik_2"],
      });
      setParameterLimits({
        gas: getLimit["Limit_Gas"],
        water: getLimit["Limit_Air"],
        listrik: getLimit["Limit_Listrik"],
      });
      setLogicLimitOption(e.target.value);
    } else if (e.target.value == "option2") {
      setTimeInputs({
        start1: getJam["Jam_Gas_1"],
        finish1: getJam["Jam_Gas_2"],
        start2: getJam["Jam_Gas_3"],
        finish2: getJam["Jam_Gas_4"],
      });
      setPriceInputs({
        price1: getParameter["Parameter_Gas"],
        price2: getParameter["Parameter_Gas_2"],
      });
      setParameterLimits({
        gas: getLimit["Limit_Gas"],
        water: getLimit["Limit_Air"],
        listrik: getLimit["Limit_Listrik"],
      });
      setLogicLimitOption(e.target.value);
    } else if (e.target.value == "option1") {
      setTimeInputs({
        start1: getJam["Jam_Air_1"],
        finish1: getJam["Jam_Air_2"],
        start2: getJam["Jam_Air_3"],
        finish2: getJam["Jam_Air_4"],
      });
      setPriceInputs({
        price1: getParameter["Parameter_Air"],
        price2: getParameter["Parameter_Air_2"],
      });
      setParameterLimits({
        gas: getLimit["Limit_Gas"],
        water: getLimit["Limit_Air"],
        listrik: getLimit["Limit_Listrik"],
      });
      setLogicLimitOption(e.target.value);
    }
    setMainObject(newObjectData1);
    //console.log(newObjectData1);
  };

  // Handle Waktu/Time
  const handleTimeChange = (value, inputKey) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 24) {
      setTimeInputs((prev) => ({
        ...prev,
        [inputKey]: numValue,
      }));
    }
    const now = new Date();
    const createdDate = now.toISOString().split("T")[0]; // Menghasilkan "2025-02-03"
    const createdTime = now.toTimeString().split(" ")[0]; // Menghasilkan "09:09:10"

    // console.log("Created_date:", createdDate);
    // console.log("Created_time:", createdTime);
    //console.log(logicLimitOption);

    if (logicLimitOption == "option1") {
      mainObject.Jam_Air_1 = timeInputs.start1;
      mainObject.Jam_Air_2 = timeInputs.finish1;
      mainObject.Jam_Air_3 = timeInputs.start2;
      mainObject.Jam_Air_4 = timeInputs.finish2;
      mainObject.User = userGlobal.name;
      mainObject.Created_date = createdDate;
      mainObject.Created_time = createdTime;
    } else if (logicLimitOption == "option2") {
      mainObject.Jam_Gas_1 = timeInputs.start1;
      mainObject.Jam_Gas_2 = timeInputs.finish1;
      mainObject.Jam_Gas_3 = timeInputs.start2;
      mainObject.Jam_Gas_4 = timeInputs.finish2;
      mainObject.User = userGlobal.name;
      mainObject.Created_date = createdDate;
      mainObject.Created_time = createdTime;
    } else if (logicLimitOption == "option3") {
      mainObject.Jam_Listrik_1 = timeInputs.start1;
      mainObject.Jam_Listrik_2 = timeInputs.finish1;
      mainObject.Jam_Listrik_3 = timeInputs.start2;
      mainObject.Jam_Listrik_4 = timeInputs.finish2;
      mainObject.User = userGlobal.name;
      mainObject.Created_date = createdDate;
      mainObject.Created_time = createdTime;
    }
    //console.log(mainObject);
  };

  // Handle uang
  const handlePriceChange = (e, inputKey) => {
    const value = e.target.value;
    if (value >= 0) {
      setPriceInputs((prev) => ({
        ...prev,
        [inputKey]: value,
      }));
    }
    var objData1 = {
      variable1: Number(priceInputs.price1),
      variable2: Number(priceInputs.price2),
    };
    if (inputKey == "price1") {
      objData1.variable1 = Number(value);
    } else if (inputKey == "price2") {
      objData1.variable2 = Number(value);
    }
    console.log(objData1);

    console.log(value);
    console.log(inputKey);

    // Membuat objek Date untuk tanggal dan waktu saat ini
    console.log(priceInputs);

    const now = new Date();
    const createdDate = now.toISOString().split("T")[0]; // Menghasilkan "2025-02-03"
    const createdTime = now.toTimeString().split(" ")[0]; // Menghasilkan "09:09:10"

    if (logicLimitOption == "option1") {
      getParameter.Parameter_Air = objData1.variable1;
      getParameter.Parameter_Air_2 = objData1.variable2;
      getParameter.User = userGlobal.name;
      getParameter.Created_date = createdDate;
      getParameter.Created_time = createdTime;
    } else if (logicLimitOption == "option2") {
      getParameter.Parameter_Gas = objData1.variable1;
      getParameter.Parameter_Gas_2 = objData1.variable2;
      getParameter.User = userGlobal.name;
      getParameter.Created_date = createdDate;
      getParameter.Created_time = createdTime;
    } else if (logicLimitOption == "option3") {
      getParameter.Parameter_Listrik = objData1.variable1;
      getParameter.Parameter_Listrik_2 = objData1.variable2;
      getParameter.User = userGlobal.name;
      getParameter.Created_date = createdDate;
      getParameter.Created_time = createdTime;
    }

    console.log(getParameter);
  };

  // Buat Handle parameter limit
  const handleParameterChange = (e, paramKey) => {
    const value = parseFloat(e.target.value) || 0;

    // Update the parameterLimits state
    if (value >= 0) {
      setParameterLimits((prev) => ({
        ...prev,
        [paramKey]: value,
      }));
    }

    const now = new Date();
    const createdDate = now.toISOString().split("T")[0]; // Menghasilkan "2025-02-03"
    const createdTime = now.toTimeString().split(" ")[0]; // Menghasilkan "09:09:10"

    // Update the getLimit object
    if (logicLimitOption === "option1") {
      getLimit.Limit_Air = paramKey === "water" ? value : getLimit.Limit_Air;
      getLimit.User = userGlobal.name;
      getLimit.Created_date = createdDate;
      getLimit.Created_time = createdTime;
    } else if (logicLimitOption === "option2") {
      getLimit.Limit_Gas = paramKey === "gas" ? value : getLimit.Limit_Gas;
      getLimit.User = userGlobal.name;
      getLimit.Created_date = createdDate;
      getLimit.Created_time = createdTime;
    } else if (logicLimitOption === "option3") {
      getLimit.Limit_Listrik =
        paramKey === "listrik" ? value : getLimit.Limit_Listrik;
      getLimit.User = userGlobal.name;
      getLimit.Created_date = createdDate;
      getLimit.Created_time = createdTime;
    }

    // Log the updated getLimit object
    console.log(getLimit);
  };

  const submitHendeler = () => {
    createJamPost();
    createParameterPost();
    createLimit();
  };

  const createJamPost = async () => {
    let tempData = mainObject;
    let response = await axios.post(
      "http://10.126.15.137:8002/part/CreateJam",
      tempData
    );
    console.log(tempData);
  };

  const createParameterPost = async () => {
    let data = getParameter;
    let newParameterData = {
      Parameter_Air: data.Parameter_Air,
      Parameter_Gas: data.Parameter_Gas,
      Parameter_Listrik: data.Parameter_Listrik,
      Parameter_Out_1: data.Parameter_Out_1,
      Parameter_Out_2: data.Parameter_Out_2,
      Parameter_Out_3: data.Parameter_Out_3,
      Parameter_Out_4: data.Parameter_Out_4,
      Parameter_Out_5: data.Parameter_Out_5,
      Parameter_Air_2: data.Parameter_Air_2,
      Parameter_Gas_2: data.Parameter_Gas_2,
      Parameter_Listrik_2: data.Parameter_Listrik_2,
      Created_date: data.Created_date,
      Created_time: data.Created_time,
      User: userGlobal.name,
    };
    console.log(newParameterData);

    let response2 = await axios.post(
      "http://10.126.15.137:8002/part/CreateParameter",
      newParameterData
    );
  };

  const createLimit = async () => {
    const now = new Date();
    const createdDate = now.toISOString().split("T")[0]; // "2025-02-05"
    const createdTime = now.toTimeString().split(" ")[0]; // "10:00:52"

    const limitData = {
      Limit_Listrik: parameterLimits.listrik,
      Limit_Gas: parameterLimits.gas,
      Limit_Air: parameterLimits.water,
      Created_date: createdDate,
      Created_time: createdTime,
      User: userGlobal.name,
    };

    try {
      let response = await axios.post(
        "http://10.126.15.137:8002/part/CreateLimit",
        limitData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating limit:", error);
    }
  };

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setIsDarkMode(currentTheme === "dark");
    };
    // Observe attribute changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-cobabg mx-auto p-4 md:p-6 2xl:p-10 relative">
        {/* Section Title */}
        <div className="text-text text-4xl font-sans font-bold mb-8 text-center">
          POWER HEALTH MONITORING
        </div>
        <div class="flex flex-col space-y-6 md:space-y-0 md:flex-row-reverse justify-between">
          <div class="flex flex-wrap items-start justify-end -mb-3">
            <button class="inline-flex px-5 py-3 text-text border bg-coba border-meta-2 dark:border-meta-4 hover:bg-gray-100 dark:hover:bg-boxdark focus:bg-purple-700 dark:focus:bg-purple-700 rounded-md mb-3 shadow-md">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Manage dashboard
            </button>
            {userGlobal.level == 5 ? (
              <button
                class="inline-flex px-5 py-3 text-text bg-coba border border-meta-2 dark:border-meta-4 hover:bg-gray-100 dark:hover:bg-boxdark focus:bg-purple-700 dark:focus:bg-purple-700 rounded-md ml-6 mb-3 shadow-md"
                onClick={onOpen}
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="flex-shrink-0 h-6 w-6 text-text -ml-1 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Bill
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Pop-Up */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent
            sx={{
              background: kartuColor,
              maxWidth: { base: "90%", xl: "80%" },
              margin: "auto",
            }}
          >
            <ModalHeader>Create Bill</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* First Row - Full Width Dropdown */}
              <FormControl mb={4}>
                <FormLabel>Limit Option</FormLabel>
                <Select placeholder="Select option" onChange={limitOption}>
                  <option value="option1">Limit_Air</option>
                  <option value="option2">Limit_Gas</option>
                  <option value="option3">Limit_Listrik</option>
                </Select>
              </FormControl>

              {/* Second Row - 4 Time Inputs */}
              <SimpleGrid
                columns={{ base: 1, md: 2, xl: 4 }}
                spacing={4}
                mb={4}
              >
                {Object.keys(timeInputs).map((key, index) => (
                  <FormControl key={`time-${index}`}>
                    <FormLabel>{timeLabels[index]}</FormLabel>
                    <NumberInput
                      value={timeInputs[key]}
                      onChange={(value) => handleTimeChange(value, key)}
                      min={0}
                      max={24}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                ))}
              </SimpleGrid>

              {/* Third Row - 2 Price Inputs */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                {Object.keys(priceInputs).map((key, index) => (
                  <FormControl key={`price-${index}`}>
                    <FormLabel>Harga Jam {index + 1}</FormLabel>
                    <InputGroup>
                      <Input
                        type="number"
                        placeholder="Enter Price"
                        value={priceInputs[key]}
                        onChange={(e) => handlePriceChange(e, key)}
                        min={0}
                      />
                      <InputRightAddon
                        children="Rp"
                        sx={{
                          background: kartuColor,
                          margin: "auto",
                        }}
                      />
                    </InputGroup>
                  </FormControl>
                ))}
              </SimpleGrid>

              {/* Fourth Row - 3 Number Inputs */}
              <Box mb={4}>
                <Text fontSize="lg" fontWeight="bold" mb={3}>
                  Parameter Limit
                </Text>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  {parameterConfigs
                    .filter(({ key }) => {
                      if (logicLimitOption === "option1")
                        return key === "water";
                      if (logicLimitOption === "option2") return key === "gas";
                      if (logicLimitOption === "option3")
                        return key === "listrik";
                      return false;
                    })
                    .map(({ key, label, unit }) => (
                      <FormControl key={`param-${key}`}>
                        <FormLabel>{label}</FormLabel>
                        <InputGroup>
                          <Input
                            type="number"
                            placeholder={`Enter ${key} limit`}
                            value={parameterLimits[key]}
                            onChange={(e) => handleParameterChange(e, key)}
                            min={0}
                          />
                          <InputRightAddon
                            children={unit}
                            sx={{
                              background: kartuColor,
                              margin: "auto",
                            }}
                          />
                        </InputGroup>
                      </FormControl>
                    ))}
                </SimpleGrid>
              </Box>
              <Button
                colorScheme="blue"
                type="submit"
                width="full"
                onClick={() => {
                  submitHendeler();
                }}
              >
                Submit
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>

        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-3">
  <div
    className={`p-8 shadow-buatcard bg-coba rounded-lg dark:border-strokedark cursor-pointer transform transition duration-300 hover:scale-105 active:scale-65 ${
      activeCard === "NVMDP" ? "ring-4 ring-blue-500" : ""
    }`}
    onClick={() => handleCardClick("NVMDP")}
  >
    {/* Wrapper untuk MVMDP dan Speedometer */}
    <div className="flex justify-between items-center">
      {/* Bagian Kiri - Informasi */}
      <div>
        <h1 className="text-2xl text-text font-bold font-DMSans mb-0">
          MVMDP
        </h1>
        <span className="inline-block text-text text-xl font-semibold">
          {data.MVMDP ?? "Loading..."}
        </span>
        <span className="block text-gray-500">KWh</span>
        <span className="block text-green-700 text-xl font-semibold">
          {(data.MVMDP * dataTotalUang).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </span>
      </div>

      {/* Bagian Kanan - Speedometer */}
        <div className="w-[200x] h-[100px] mb-6">
          <ReactSpeedometer
            width={170}  // Lebarkan sedikit
            height={140} // Tinggikan supaya tidak kepotong
            textColor="white"         // Untuk label angka di sekitar speedometer
            valueTextColor="white"    // Untuk angka di bawah jarum speedometer
            labelFontColor="white"    // Untuk teks skala (0, 200, 400, dst.)
            minValue={0}
            maxValue={2}
            currentValueText={`cos φ = ${costPhi}`} 
            value={costPhi}
            needleColor="steelblue"
            startColor="red"
            endColor="green"
            segments={5} // 5 segmen warna
            segmentColors={["#D65A5A", "#EFCB68", "#7AC74F", "#EFCB68", "#D65A5A"]} // Warna segmen
            ringWidth={15}
            needleHeightRatio={0.7}
            valueTextFontSize="16px"
            labelFontSize="10px"
          />
          
        </div>
        
    </div>

    {/* Progress Bar */}
    <div className="space-y-1 pt-3">
      <Progress
        hasStripe
        value={data.MVMDP}
        max={getLimit.Limit_Listrik}
        className="rounded-full"
        sx={{
          "& > div": { backgroundColor: "#F3E8FF" }, 
          backgroundColor: isDarkMode ? "#282828" : "#ededed",
        }}
      />
      <div className="flex justify-end">
        <span className="flex items-center gap-1 text-[16px] pt-1 font-light text-gray-500">
          {((data.MVMDP / getLimit.Limit_Listrik) * 100).toFixed(1)}%
          <svg
            className="fill-gray-500"
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
              fill=""
            />
          </svg>
        </span>
      </div>
    </div>
  </div>


          <div
            className={`p-8 shadow-buatcard bg-coba rounded-lg dark:border-strokedark cursor-pointer transform transition duration-300 hover:scale-105 active:scale-65 ${
              activeCard === "PDAM" ? "ring-4 ring-blue-500" : ""
            }`}
            onClick={() => handleCardClick("PDAM")}
          >
            <div className="flex items-center mb-1">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl text-text font-bold font-DMSans mb-0">
                  PDAM
                </h1>
                <span className="inline-block text-text text-xl font-semibold">
                  {data.PDAM ?? "Loading..."}
                </span>
                <span className="block text-gray-500">kubik</span>
                <span className="block text-green-700 text-xl font-semibold">
                  {(data.PDAM * dataTotalUangAir).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </span>
              </div>
            </div>
            <div className="space-y-1 pl-[88px]">
              <Progress
                hasStripe
                value={data.PDAM}
                max={getLimit.Limit_Air}
                className="rounded-full"
                sx={{
                  "& > div": { backgroundColor: "#DCFCE7" }, // Warna kustom untuk bar
                  backgroundColor: isDarkMode ? "#282828" : "#ededed", // Warna kustom untuk track
                }}
              />
              <div className="flex justify-end">
                <span className="flex items-center gap-1 text-[16px] pt-1 font-light text-gray-500">
                  {((data.PDAM / getLimit.Limit_Air) * 100).toFixed(1)}%
                  <svg
                    className="fill-gray-500"
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                      fill=""
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 shadow-buatcard bg-coba rounded-lg dark:border-strokedark cursor-pointer transform transition duration-300 hover:scale-105 active:scale-65">
            <div className="flex items-center mb-1">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl text-text font-bold font-DMSans mb-0">
                  Boiler
                </h1>
                <span className="inline-block text-text text-xl font-semibold truncate">
                  {parseFloat(data.Total_Gas_Boiler).toFixed(3) ?? "Loading..."}
                </span>
                <span className="block text-gray-500">MBTU</span>
                <span className="block text-green-700 text-xl font-semibold">
                  {(data.Total_Gas_Boiler * dataTotalUangGas).toLocaleString(
                    "id-ID",
                    { style: "currency", currency: "IDR" }
                  )}
                </span>
              </div>
            </div>
            <div className="space-y-1 pl-[88px]">
              <Progress
                hasStripe
                value={data.Total_Gas_Boiler}
                max={getLimit.Limit_Gas}
                className="rounded-full"
                sx={{
                  "& > div": { backgroundColor: "#FEE2E2" }, // Warna kustom untuk bar
                  backgroundColor: isDarkMode ? "#282828" : "#ededed", // Warna kustom untuk track
                }}
              />
              <div className="flex justify-end">
                <span className="flex items-center gap-1 text-[16px] pt-1 justify-end font-light text-gray-500">
                  {((data.Total_Gas_Boiler / getLimit.Limit_Gas) * 100).toFixed(
                    1
                  )}
                  %
                  <svg
                    className="fill-gray-500"
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                      fill=""
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center p-6 shadow-buatcard bg-coba rounded-lg dark:border-strokedark">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div className="md:flex-1">
              <h1 className="text-2xl text-text font-bold font-DMSans text-center mb-0">
                Output Master Box
              </h1>
              <div className="grid grid-cols-4 text-center border-b border-gray-300 text-text py-1">
                <div className="font-bold text-text">ID</div>
                <div className="font-bold text-text">Line 1</div>
                <div className="font-bold text-text">Line 2</div>
                <div className="font-bold text-text">Line 3</div>
              </div>
              <div className="grid grid-cols-4 text-center pt-2">
                <div className="text-text font-semibold">A</div>
                <div className="text-text">{data.MasterBoxL1 ?? "N/A"}</div>
                {/* <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <span class="sr-only">Loading...</span>
                  </div> */}
                <div className="flex flex-row justify-center ">
                  <Spinner
                    thickness="2px"
                    speed="1.5s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="sm"
                    alignItems="center"
                  />
                </div>
                <div className="text-text">{data.MasterBoxL3_1 ?? "N/A"}</div>
              </div>
              <div className="grid grid-cols-4 text-center">
                <div className="text-text font-semibold">B</div>
                <div className="text-text">N/A</div>
                <div className="text-text">{data.MasterBoxL2_2 ?? "N/A"}</div>
                <div className="text-text">{data.MasterBoxL3_2 ?? "N/A"}</div>
              </div>
              <div className="grid grid-cols-4 text-center">
                <div className="text-text font-semibold">C</div>
                <div className="text-text">N/A</div>
                <div className="flex flex-row justify-center ">
                  <Spinner
                    thickness="2px"
                    speed="1.5s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="sm"
                    alignItems="center"
                  />
                </div>
                <div className="flex flex-row justify-center ">
                  <Spinner
                    thickness="2px"
                    speed="1.5s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="sm"
                    alignItems="center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ============================================================================================================================================================================ */}
        <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-5">
          <div
            className={`p-8 shadow-buatcard bg-coba rounded-lg dark:border-strokedark  `}
          >
            <div className="flex items-center mb-1">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl text-text font-bold font-DMSans mb-0">
                  Ampere
                </h1>
                <div className="flex flex-row">
                  <span className="inline-block text-text text-xl font-semibold">
                    {mainAmpere ?? "Loading..."}
                  </span>
                  <span className="block text-gray-500 ml-3 mt-1">A</span>
                </div>
              </div>
   
            </div>
            <div className="mt-6">
              <CanvasJSChart options={options} />
            </div>
          </div>
          <div
            className={`p-8 shadow-buatcard bg-coba rounded-lg dark:border-strokedark  `}
          >
            <div className="flex items-center mb-1">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl text-text font-bold font-DMSans mb-0">
                  Frequency
                </h1>
                <div className="flex flex-row">
                  <span className="inline-block text-text text-xl font-semibold">
                    {mainFQ ?? "Loading..."}
                  </span>
                  <span className="block text-gray-500 ml-3 mt-1">Hz</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <CanvasJSChart options={options1} />
            </div>

          </div>

          <div className="p-8 shadow-buatcard bg-coba rounded-lg dark:border-strokedark ">
            <div className="flex items-center mb-1">
              <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl text-text font-bold font-DMSans mb-0">
                  Volt
                </h1>
                <div className="flex flex-row">
                  <span className="inline-block text-text text-xl font-semibold">
                    {mainVolt ?? "Loading..."}
                  </span>
                  <span className="block text-gray-500 ml-3 mt-1">Volt</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <CanvasJSChart options={options2} />
            </div>
          </div>
        </section>

        {/* Conditional Content Section */}
        <section className="mt-8">
          {activeCard === "NVMDP" && (
            <div>
              <h2 className="text-2xl font-bold text-center text-text mb-4">
                Power Consumption
              </h2>
              {loading ? (
                <div className="flex flex-col items-center">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </div>
              ) : error ? (
                <div className="text-red-500 flex flex-col items-center">
                  Error occurred
                </div>
              ) : (
                <NVMDP /> // Konten utama
              )}
            </div>
          )}
          {activeCard === "PDAM" && (
            <div>
              <h2 className="text-2xl font-bold text-center text-text mb-4">
                Water Consumption
              </h2>
              {loading ? (
                <div className="flex flex-col items-center">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </div>
              ) : error ? (
                <div className="text-red-500 flex flex-col items-center">
                  Error occurred
                </div>
              ) : (
                <PDAM /> // Konten utama
              )}
            </div>
          )}
          {!activeCard && (
            <div className="text-center mt-8">
              <p className="text-text">Please select a card to view details.</p>
            </div>
          )}
        </section>

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-[30px] 2xl:gap-[10px]">
          {/* <Chart01 />
            <Chart02 /> */}
          {/* <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4"> */}

          {/* </div> */}
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    </div>
  );
}

export default Dashboard;
