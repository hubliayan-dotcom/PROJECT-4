# Shield AI: System Architecture

## 1. High-Level Block Diagram
```text
[ Network Traffic ] -> [ Data Loader ] -> [ Preprocessor ] -> [ ML Models ]
                                                                    |
                                                                    v
[ Dashboard UI ] <--- [ Flask/Express API ] <--- [ Alert Generator ]
```

## 2. Data Flow
1. **Ingestion**: Raw network packets (simulated by UNSW-NB15 dataset) are loaded into the system.
2. **Transformation**: Categorical features are encoded, and numerical features are normalized using StandardScaler.
3. **Detection**: 
   - **Random Forest**: Classifies traffic into 9 specific attack categories.
   - **Isolation Forest**: Detects zero-day anomalies by calculating outlier scores.
4. **Alerting**: High-risk predictions trigger severity-coded alerts (LOW, MEDIUM, HIGH, CRITICAL).
5. **Visualization**: Real-time stats and historical trends are pushed to the React dashboard.

## 3. Module Explanation
- **src/ml/data_loader.py**: Handles CSV ingestion and initial data validation.
- **src/ml/preprocessor.py**: Implements the cleaning pipeline (null removal, encoding, scaling).
- **src/ml/model_trainer.py**: Contains the logic for training and saving the Random Forest and Isolation Forest models.
- **src/ml/evaluator.py**: Calculates performance metrics (F1, Precision, Recall) and generates the confusion matrix.
- **src/ml/alert_generator.py**: Maps model outputs to human-readable security alerts.
- **server.ts**: Acts as the production deployment layer, providing REST endpoints for the frontend.
- **src/App.tsx**: The central Security Operations Center (SOC) interface.
