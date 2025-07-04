import { TextStyle, ViewStyle } from "react-native";
import { borderRadius } from "./borderRadius";
import { colors } from "./colors";
import { shadows } from "./shadows";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background
  } as ViewStyle,

  content: {
    flex: 1,
    padding: spacing.xl
  } as ViewStyle,

  centeredContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xl
  } as ViewStyle,

  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.sm
  } as TextStyle,

  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.xxxl
  } as TextStyle,

  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md
  } as TextStyle,

  bodyText: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    textAlign: "center"
  } as TextStyle,

  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    fontSize: typography.sizes.md,
    color: colors.text.primary
  } as ViewStyle,

  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: "center",
    marginBottom: spacing.lg
  } as ViewStyle,

  buttonDisabled: {
    backgroundColor: colors.text.tertiary,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: "center",
    marginBottom: spacing.lg
  } as ViewStyle,

  buttonText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold
  } as TextStyle,

  linkButton: {
    alignItems: "center"
  } as ViewStyle,

  linkText: {
    color: colors.primary,
    fontSize: typography.sizes.md
  } as TextStyle,

  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md
  } as ViewStyle,

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light
  } as ViewStyle,

  headerTitle: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary
  } as TextStyle,

  logoutButton: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    alignSelf: "center",
    marginTop: spacing.xl
  } as ViewStyle,

  logoutText: {
    color: colors.text.inverse,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold
  } as TextStyle,

  section: {
    marginBottom: spacing.xxl
  } as ViewStyle,

  placeholder: {
    alignItems: "center",
    marginBottom: spacing.xxxl
  } as ViewStyle,

  placeholderText: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.sm
  } as TextStyle,

  placeholderSubtext: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    textAlign: "center"
  } as TextStyle
};
