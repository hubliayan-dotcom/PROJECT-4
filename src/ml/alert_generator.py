import pandas as pd

SEVERITY_MAP = {0: ('NORMAL', 'LOW'), 1: ('ATTACK DETECTED', 'HIGH')}

def generate_alerts(predictions, save_path='outputs/alert_log.csv'):
    alerts = []
    for i, pred in enumerate(predictions[:50]):
        label, severity = SEVERITY_MAP.get(int(pred), ('UNKNOWN', 'MEDIUM'))
        alerts.append({'Sample': i, 'Prediction': label, 'Severity': severity})
    df = pd.DataFrame(alerts)
    df.to_csv(save_path, index=False)
    print(f"Alert log saved to {save_path}")
    return df
