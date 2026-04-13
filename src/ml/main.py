from data_loader import load_data
from preprocessor import preprocess
from model_trainer import train_classifier, train_anomaly_detector
from evaluator import evaluate_model, plot_confusion_matrix
from alert_generator import generate_alerts

# Constants
TRAIN_PATH = 'data/UNSW_NB15_training-set.csv'
TEST_PATH  = 'data/UNSW_NB15_testing-set.csv'

def run_pipeline():
    print("--- Starting Shield AI ML Pipeline ---")
    
    # 1. Load Data
    train_df, test_df = load_data(TRAIN_PATH, TEST_PATH)
    if train_df is None: return

    # 2. Preprocess
    X_train, X_test, y_train, y_test, scaler, feat_names = preprocess(
        train_df, test_df, target_col='label')

    # 3. Train Models
    rf_model  = train_classifier(X_train, y_train)
    iso_model = train_anomaly_detector(X_train)

    # 4. Evaluate
    y_pred = evaluate_model(rf_model, X_test, y_test)
    plot_confusion_matrix(y_test, y_pred)

    # 5. Generate Alerts
    generate_alerts(y_pred)

    print("--- Pipeline Complete ---")

if __name__ == "__main__":
    run_pipeline()
