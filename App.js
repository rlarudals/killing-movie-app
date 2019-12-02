import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CommonBtn from "./components/CommonBtn";
import { movies } from "./api/movies.js";

class App extends React.Component {
  // 변경 되면 화면을 재시작 - > state
  state = {
    viewPopular: null,
    loading: false
  };

  // render() 후 자동으로 실행되는 화면
  componentDidMount = async () => {
    // async - await :: await이 완료 될 때까지 기다려야함
    let popular, nowPlaying;

    // 실행
    try {
      popular = await movies.getPopular();
      nowPlaying = await movies.getNowPlaying();
    } catch (error) {
      // 에러 발생 시,
      alert("영화 데이터 가져오기 실패");
    } finally {
      // 정상구동하든, 에러나든 무조건
      popular = popular.data.results;
      nowPlaying = nowPlaying.data.results;

      this.setState({
        viewPopular: popular,
        loading: true
      });
    }
  };

  render() {
    const { viewPopular, loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.btnArea}>
          <CommonBtn>Popular</CommonBtn>
          <CommonBtn>NowPlaying</CommonBtn>
        </View>

        {loading ? (
          viewPopular.map(movie => (
            <View key={movie.id}>
              <Text>{movie.title}</Text>
            </View>
          ))
        ) : (
          <Text>Loading ... </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50
  },
  btnArea: {
    flexDirection: "row",
    borderBottomColor: "#636e72",
    borderBottomWidth: 1,
    borderTopColor: "#636e72",
    borderTopWidth: 1,
    paddingBottom: 10,
    paddingTop: 10
  }
});

export default App;
