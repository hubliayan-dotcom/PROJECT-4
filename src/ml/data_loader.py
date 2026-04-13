import pandas as pd
import os

def load_data(train_path, test_path):
    """Load UNSW-NB15 training and testing datasets."""
    if not os.path.exists(train_path) or not os.path.exists(test_path):
        print("Dataset files not found. Please download UNSW-NB15.")
        return None, None
    
    train = pd.read_csv(train_path)
    test  = pd.read_csv(test_path)
    print(f"Train: {train.shape} | Test: {test.shape}")
    return train, test
