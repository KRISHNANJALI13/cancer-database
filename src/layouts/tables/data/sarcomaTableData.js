import { useState, useEffect } from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiBadge from "components/VuiBadge";
import axios from "axios";

function SarcomaTableData() {
  const [columns] = useState([
    { name: "patient_id", align: "left" },
    { name: "age", align: "center" },
    { name: "gender", align: "center" },
    { name: "tumor_size_cm", align: "center" },
    { name: "tumor_location", align: "center" },
    { name: "histological_grade", align: "center" },
    { name: "metastasis", align: "center" },
    { name: "survival_months", align: "center" },
    { name: "survival_status", align: "center" },
  ]);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4000/sarcoma?page=${page}&limit=3`);
        const newData = response.data.data.map((item) => ({
          patient_id: item.patient_id,
          age: item.age,
          gender: item.gender,
          tumor_size_cm: item.tumor_size_cm,
          tumor_location: item.tumor_location,
          histological_grade: item.histological_grade,
          metastasis: (
            <VuiBadge
              variant="standard"
              badgeContent={item.metastasis === "True" ? "Yes" : "No"}
              color={item.metastasis === "True" ? "error" : "success"}
              size="xs"
              container
            />
          ),
          survival_months: item.survival_months,
          survival_status: (
            <VuiTypography
              variant="caption"
              fontWeight="medium"
              color={item.survival_status === "Alive" ? "success" : "error"}
            >
              {item.survival_status}
            </VuiTypography>
          ),
        }));

        setRows((prevRows) => [...prevRows, ...newData]);
        setPage((prevPage) => prevPage + 1);
        setHasMore(response.data.currentPage < response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { columns, rows };
}

export default SarcomaTableData;
