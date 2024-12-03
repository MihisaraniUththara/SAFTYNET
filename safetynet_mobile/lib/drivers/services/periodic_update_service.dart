import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:safetynet_mobile/drivers/services/identifyAccidentProneAreas.dart';

class PeriodicUpdateService with ChangeNotifier {
  Timer? _timer;

  PeriodicUpdateService() {
    _startPeriodicUpdates();
  }

  void _startPeriodicUpdates() {
    // Set a periodic timer (e.g., every 24 hours)
    _timer = Timer.periodic(Duration(hours: 24), (timer) async {
      await identifyAccidentProneAreas();
      debugPrint('Accident-prone areas updated at ${DateTime.now()}');
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }
}
