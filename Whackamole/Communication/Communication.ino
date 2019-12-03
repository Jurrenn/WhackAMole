const int buttonPins[9] = 
  {2, 3, 4, 
   5, 6, 7, 
   8, 9, 10};

int buttonStates[9];

int lastButtonStates[9] = { LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW };

unsigned long debounceTimes[9] = { 0, 0, 0, 0, 0, 0, 0, 0, 0 };

unsigned long delayTime = 50;

void setup() {
  for(int i = 0; i < 9; i++) {
    pinMode(buttonPins[i], INPUT);
  }
  
  Serial.begin(9600);
}

void loop() {
  int readButtonStates[9];
  // Checkt voor elke knop of deze ingedrukt is
  for(int i = 0; i < 9; i++) {
    readButtonStates[i] = digitalRead(buttonPins[i]);
    
    // Start een delay als de buttonstate verandert
    if (readButtonStates[i] != lastButtonStates[i]) {
      debounceTimes[i] = millis();
    }
    
    // Stuurt naar de console welke knop is ingedrukt
    if ((millis() - debounceTimes[i]) > delayTime) {
      if (readButtonStates[i] != buttonStates[i]) {
        buttonStates[i] = readButtonStates[i];
        Serial.println(String(i));
      }
    }

    // Slaat huidige buttonstate op
    lastButtonStates[i] = readButtonStates[i];
  }
 
}
