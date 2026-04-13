import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler

def preprocess(train_df, test_df, target_col='label'):
    # Drop nulls and duplicates
    train_df = train_df.dropna().drop_duplicates()
    test_df  = test_df.dropna().drop_duplicates()

    # Drop irrelevant columns
    drop_cols = ['id', 'attack_cat']
    train_df = train_df.drop(columns=[c for c in drop_cols if c in train_df.columns])
    test_df  = test_df.drop(columns=[c for c in drop_cols if c in test_df.columns])

    # Encode categorical columns
    cat_cols = [c for c in train_df.select_dtypes(include='object').columns
                if c != target_col]
    le = LabelEncoder()
    for col in cat_cols:
        train_df[col] = le.fit_transform(train_df[col].astype(str))
        test_df[col]  = le.transform(test_df[col].astype(str))

    # Split features and labels
    X_train = train_df.drop(columns=[target_col])
    y_train = train_df[target_col]
    X_test  = test_df.drop(columns=[target_col])
    y_test  = test_df[target_col]

    # Scale features
    scaler = StandardScaler()
    X_train_s = scaler.fit_transform(X_train)
    X_test_s  = scaler.transform(X_test)

    print("Preprocessing complete.")
    return X_train_s, X_test_s, y_train, y_test, scaler, list(X_train.columns)
