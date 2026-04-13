import joblib
from sklearn.ensemble import RandomForestClassifier, IsolationForest

def train_classifier(X_train, y_train, save_path='models/random_forest_model.pkl'):
    model = RandomForestClassifier(
        n_estimators=100, max_depth=20,
        random_state=42, n_jobs=-1
    )
    model.fit(X_train, y_train)
    joblib.dump(model, save_path)
    print(f"Random Forest saved to {save_path}")
    return model

def train_anomaly_detector(X_train, save_path='models/isolation_forest_model.pkl'):
    iso = IsolationForest(
        n_estimators=100, contamination=0.1, random_state=42
    )
    iso.fit(X_train)
    joblib.dump(iso, save_path)
    print(f"Isolation Forest saved to {save_path}")
    return iso
