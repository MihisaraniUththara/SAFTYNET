import '/models/onboarding_model.dart';

class OnbardingData {
  static final List<Onboarding> onboardingList = [
    Onboarding(
      title: "Real-time alerts",
      imagePath: "assets/images/onboard_1.png",
      description: "Receive real-time alerts for accident-prone areas",
    ),
    Onboarding(
      title: "Real-time weather alerts and tips",
      imagePath: "assets/images/onboard_2.png",
      description: "Receive real-time weather alerts and safety tips",
    ),
    Onboarding(
      title: "Notify emergencies",
      imagePath: "assets/images/onboard_3.png",
      description: "Notify emergency contacts",
    ),
  ];
}
