import axios, { AxiosResponse } from "axios";
import { Component } from "react";

export interface Props {
  data: ApiResponse | null;
  // Customizable Area Start
  // Customizable Area End
}

interface ApiResponse {
  // Customizable Area Start
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  // Customizable Area End
}

interface SS {
  data: ApiResponse[] | null;
  error: string | null;
  currentPage: number;
  totalPages: number;
  todos: ApiResponse[];
}

export default class PagController extends Component<Props, SS> {
  constructor(props: Props) {
    super(props);

    // Customizable Area Start

    this.state = {
      data: null,
      error: null,
      currentPage: 1,
      totalPages: 0,
      todos: []
    };
    // Customizable Area End
    this.fetchData = this.fetchData.bind(this);
  }
  handleChange = (_event: any, value: number) => {
    this.setState({ currentPage: value }, () => {
      this.fetchData();
    });
  };

  componentDidMount(): void {
    this.fetchData();
  }
  API_url = "https://jsonplaceholder.typicode.com/todos";
  fetchData = () => {
    const { currentPage } = this.state;

    axios
      .get<ApiResponse[]>(`${this.API_url}?_limit=10&_page=${currentPage}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response: AxiosResponse<ApiResponse[]>) => {
        const { data, headers } = response;
        const totalPages = Math.ceil(Number(headers["x-total-count"]) / 6);

        this.setState({
          data: null,
          error: null,
          totalPages,
          todos: data
        });
      })
      .catch((error: any) => {
        this.setState({
          data: null,
          error: "An error occurred while fetching data."
        });
      });
  };
}
