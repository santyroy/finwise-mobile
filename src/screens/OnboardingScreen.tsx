import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {slides} from '@constants/Onboarding';
import {useRef, useState} from 'react';
import {Colors} from 'constants/Colors';
import {OnboardingScreenNavigationProp} from 'types/navigation_types';
import PrimaryButton from 'components/PrimaryButton';
import SecondaryButton from 'components/SecondaryButton';
import {useNavigation} from '@react-navigation/native';

const OnboardingScreen = () => {
  const {height, width} = useWindowDimensions();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<FlatList>(null);
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentSlide = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentSlide);
  };

  const skipSlides = () => {
    const lastSlideIndex = slides.length - 1;
    const lastOffset = lastSlideIndex * width;
    ref.current?.scrollToOffset({animated: true, offset: lastOffset});
    setCurrentSlideIndex(lastSlideIndex);
  };

  const nextSlide = () => {
    if (currentSlideIndex !== slides.length - 1) {
      const nextSlideIndex = currentSlideIndex + 1;
      const nextOffset = nextSlideIndex * width;
      ref.current?.scrollToOffset({animated: true, offset: nextOffset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const goToSignIn = () => navigation.replace('SignIn');

  return (
    <SafeAreaView style={styles.container}>
      {/* Slides */}
      <FlatList
        data={slides}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={[styles.slideContainer, {maxWidth: width}]}>
            <Image
              source={item.image}
              resizeMode="contain"
              style={[{width: width}, styles.slideImage]}
            />
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideSubTitle}>{item.subTitle}</Text>
          </View>
        )}
        contentContainerStyle={{height: height * 0.75}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        ref={ref}
      />

      {/* Indicators */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex === index && styles.indicatorActive,
            ]}
          />
        ))}
      </View>

      {/* Buttons */}
      {currentSlideIndex !== slides.length - 1 ? (
        <View style={styles.buttonContainer}>
          <SecondaryButton title="Skip" onPress={skipSlides} />
          <PrimaryButton title="Next" onPress={nextSlide} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <PrimaryButton title="Get Started" onPress={goToSignIn} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // OnboardingSlide
  slideContainer: {
    alignItems: 'center',
  },
  slideImage: {
    height: '75%',
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.base.dark['100'],
  },
  slideSubTitle: {
    maxWidth: '70%',
    fontSize: 16,
    textAlign: 'center',
    color: Colors.base.light[20],
    lineHeight: 20,
  },

  // Indicator
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: Colors.violet[20],
    borderRadius: 5,
  },
  indicatorActive: {
    backgroundColor: Colors.violet[100],
  },

  // Button
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
});
