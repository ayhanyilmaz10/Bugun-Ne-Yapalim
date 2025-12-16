import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  Easing,
  ImageBackground,
  Share,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { getRandomSuggestion } from "@/data/suggestions";

const FAVORITES_KEY = "favorite_suggestions";

export default function Home() {
  const [suggestion, setSuggestion] = useState<string>(
    "Butona bas ve sana ne yapacağını söyleyelim!"
  );
  const [hasStarted, setHasStarted] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  // Favorileri yükle
  useEffect(() => {
    loadFavorites();
  }, []);

  // Favorileri kontrol et
  useEffect(() => {
    setIsFavorite(favorites.includes(suggestion));
  }, [suggestion, favorites]);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Favoriler yüklenemedi:", e);
    }
  };

  const toggleFavorite = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    let newFavorites: string[];
    if (isFavorite) {
      newFavorites = favorites.filter((f) => f !== suggestion);
    } else {
      newFavorites = [...favorites, suggestion];
    }

    setFavorites(newFavorites);
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (e) {
      console.error("Favori kaydedilemedi:", e);
    }
  };

  const removeFavorite = async (item: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newFavorites = favorites.filter((f) => f !== item);
    setFavorites(newFavorites);
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (e) {
      console.error("Favori silinemedi:", e);
    }
  };

  const selectFavorite = (item: string) => {
    setSuggestion(item);
    setHasStarted(true);
    setShowFavorites(false);
  };

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      await Share.share({
        message: `${suggestion}\n\n— Bugün Ne Yapalım? 🎲`,
      });
    } catch (e) {
      Alert.alert("Hata", "Paylaşım yapılamadı");
    }
  };

  // Animasyonlar
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handlePress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const newSuggestion = getRandomSuggestion();
      setSuggestion(newSuggestion);
      setHasStarted(true);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <ImageBackground
      source={require("../assets/splash.png")}
      className="flex-1"
      resizeMode="cover"
    >
      {/* İçerik */}
      <View className="flex-1 items-center justify-center px-6">
        {/* Öneri Kartı */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="mb-8 w-full rounded-3xl bg-slate-900/85 p-6 shadow-2xl"
        >
          <Text
            className={`text-center font-quicksand-semibold text-2xl leading-relaxed ${
              hasStarted ? "text-amber-400" : "text-white/70"
            }`}
          >
            {suggestion}
          </Text>

          {/* Favori & Paylaş Butonları */}
          {hasStarted && (
            <View className="mt-4 flex-row justify-center gap-4">
              <Pressable
                onPress={toggleFavorite}
                className="flex-row items-center rounded-full bg-white/10 px-4 py-2"
              >
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={20}
                  color={isFavorite ? "#f43f5e" : "#fff"}
                />
                <Text className="ml-2 font-quicksand text-sm text-white">
                  {isFavorite ? "Favorilerde" : "Favorile"}
                </Text>
              </Pressable>

              <Pressable
                onPress={handleShare}
                className="flex-row items-center rounded-full bg-white/10 px-4 py-2"
              >
                <Ionicons name="share-outline" size={20} color="#fff" />
                <Text className="ml-2 font-quicksand text-sm text-white">
                  Paylaş
                </Text>
              </Pressable>
            </View>
          )}
        </Animated.View>

        {/* Ana Buton */}
        <Animated.View
          style={{
            transform: [{ scale: buttonScale }],
          }}
        >
          <Pressable onPress={handlePress} className="active:opacity-90">
            <LinearGradient
              colors={["#f59e0b", "#d97706"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-full px-14 py-6 shadow-2xl"
              style={{
                shadowColor: "#f59e0b",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.5,
                shadowRadius: 20,
                elevation: 12,
              }}
            >
              <Text className="text-center font-quicksand-bold text-2xl text-white">
                🎲 Ne Yapalım?
              </Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>

        {/* Favori Sayısı - Tıklanabilir */}
        {favorites.length > 0 && (
          <Pressable
            onPress={() => setShowFavorites(true)}
            className="mt-6 flex-row items-center rounded-full bg-slate-900/60 px-4 py-2"
          >
            <Ionicons name="heart" size={16} color="#f43f5e" />
            <Text className="ml-2 font-quicksand text-sm text-white/70">
              {favorites.length} favori fikrin var
            </Text>
            <Ionicons
              name="chevron-forward"
              size={16}
              color="#fff"
              style={{ marginLeft: 4 }}
            />
          </Pressable>
        )}
      </View>

      {/* Favoriler Modal */}
      <Modal
        visible={showFavorites}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFavorites(false)}
      >
        <View className="flex-1 justify-end">
          <View className="max-h-[70%] rounded-t-3xl bg-slate-900 p-6">
            {/* Header */}
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="font-quicksand-bold text-xl text-white">
                ❤️ Favori Fikirlerim
              </Text>
              <Pressable
                onPress={() => setShowFavorites(false)}
                className="rounded-full bg-white/10 p-2"
              >
                <Ionicons name="close" size={24} color="#fff" />
              </Pressable>
            </View>

            {/* Favori Listesi */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {favorites.length === 0 ? (
                <Text className="py-8 text-center font-quicksand text-white/50">
                  Henüz favori fikrin yok
                </Text>
              ) : (
                favorites.map((item, index) => (
                  <View
                    key={index}
                    className="mb-3 flex-row items-center rounded-2xl bg-white/10 p-4"
                  >
                    <Pressable
                      onPress={() => selectFavorite(item)}
                      className="flex-1"
                    >
                      <Text className="font-quicksand text-base text-amber-400">
                        {item}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => removeFavorite(item)}
                      className="ml-3 rounded-full bg-red-500/20 p-2"
                    >
                      <Ionicons name="trash-outline" size={18} color="#f43f5e" />
                    </Pressable>
                  </View>
                ))
              )}
            </ScrollView>

            {/* Alt Bilgi */}
            {favorites.length > 0 && (
              <Text className="mt-4 text-center font-quicksand text-xs text-white/40">
                Bir fikre tıklayarak seçebilirsin
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
